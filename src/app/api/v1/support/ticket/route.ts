import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import { dispatchTelegramHtml, escapeTelegramHtml } from '@/lib/server/telegram';

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`support-ticket:${user.id}`, 10, 15 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many support tickets submitted. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const category = String(body.category || 'General Support').trim().slice(0, 80);
  const subject = String(body.subject || category).trim().slice(0, 160);
  const description = String(body.description || '').trim().slice(0, 4000);
  const phone = String(body.phone || '').trim().slice(0, 40) || null;
  const suppliedEmail = String(body.email || '').trim().slice(0, 160);

  if (description.length < 5) {
    return NextResponse.json(
      { ok: false, error: 'Please provide at least 5 characters describing the issue.' },
      { status: 400 }
    );
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('username, email, first_name, last_name')
    .eq('id', user.id)
    .maybeSingle();

  const username = String(
    (profile as Record<string, unknown> | null)?.username ||
      user.user_metadata?.username ||
      'user'
  ).trim();
  const contactEmail = String(
    suppliedEmail ||
      (profile as Record<string, unknown> | null)?.email ||
      user.email ||
      ''
  ).trim();

  const { data: inserted, error: insertError } = await admin
    .from('user_support_tickets')
    .insert({
      user_id: user.id,
      username,
      email: contactEmail || null,
      phone,
      category,
      subject,
      description,
      status: 'open',
      priority: 'normal',
    })
    .select('id, created_at')
    .single();

  if (insertError || !inserted) {
    return NextResponse.json(
      { ok: false, error: insertError?.message || 'Failed to save support ticket.' },
      { status: 500 }
    );
  }

  const dbId = String((inserted as Record<string, unknown>).id);
  const ticketCode = `ZEV-${dbId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;

  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

  const html = [
    `🛠 <b>NEW SUPPORT TICKET SUBMITTED</b> 🛠`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `🎫 <b>Ticket ID:</b> <code>#${escapeTelegramHtml(ticketCode)}</code>`,
    `🔖 <b>User:</b> @${escapeTelegramHtml(username)}`,
    `📧 <b>Contact Email:</b> ${escapeTelegramHtml(contactEmail || 'Not provided')}`,
    `🆔 <b>User UUID:</b> <code>${escapeTelegramHtml(user.id)}</code>`,
    ``,
    `📁 <b>Category / Topic:</b> <b>${escapeTelegramHtml(category)}</b>`,
    `📅 <b>Reported At:</b> ${escapeTelegramHtml(dateStr)}`,
    ``,
    `📝 <b>Issue Description:</b>`,
    `<i>${escapeTelegramHtml(description)}</i>`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Action: Please review and assist user in ZEV Admin Portal.</i>`,
  ].join('\n');

  const tgResult = await dispatchTelegramHtml(html);

  return NextResponse.json({
    ok: true,
    id: dbId,
    ticketId: ticketCode,
    telegramSent: tgResult.sent,
  });
}

