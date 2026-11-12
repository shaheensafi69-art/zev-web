import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import {
  checkRateLimit,
  getClientIp,
  getSupabaseAdmin,
} from '@/lib/server/supabaseAdmin';
import { dispatchTelegramHtml, escapeTelegramHtml } from '@/lib/server/telegram';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rl = checkRateLimit(`delete-account:${ip}`, 5, 60 * 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests from this network. Please try again later.',
        },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
      );
    }

    const body = (await req.json()) as Record<string, unknown>;
    const identifier = String(body.identifier || '').trim();
    const reason = String(body.reason || 'Not Specified').trim().slice(0, 120);
    const feedback = String(body.feedback || '').trim().slice(0, 2000);
    const confirmDataLoss = body.confirmDataLoss === true;
    const locale = String(body.locale || 'fa').trim().slice(0, 10);

    if (identifier.length < 3 || identifier.length > 160) {
      return NextResponse.json(
        {
          success: false,
          error:
            locale === 'en'
              ? 'Please enter a valid ZEV username, email, or phone number.'
              : 'لطفاً نام کاربری، ایمیل یا شماره موبایل معتبر وارد کنید.',
        },
        { status: 400 }
      );
    }

    if (!confirmDataLoss) {
      return NextResponse.json(
        {
          success: false,
          error:
            locale === 'en'
              ? 'You must acknowledge permanent data deletion to continue.'
              : 'برای ادامه، تایید آگاهی از حذف دائمی اطلاعات الزامی است.',
        },
        { status: 400 }
      );
    }

    const ticketId =
      'ZEV-DEL-' + crypto.randomBytes(4).toString('hex').toUpperCase();
    const nowIso = new Date().toISOString();
    const nowKabul = new Date().toLocaleString('fa-IR', {
      timeZone: 'Asia/Kabul',
    });

    const admin = getSupabaseAdmin();

    // Try matching existing profile defensively (so admin can locate user cleanly)
    const cleanedIdent = identifier.replace(/^@+/, '').replace(/[%_,()]/g, '');
    let matchedUserId: string | null = null;
    try {
      const { data: matched } = await admin
        .from('profiles')
        .select('id')
        .or(`username.ilike.${cleanedIdent},email.ilike.${cleanedIdent}`)
        .limit(1)
        .maybeSingle();
      if (matched && typeof (matched as Record<string, unknown>).id === 'string') {
        matchedUserId = String((matched as Record<string, unknown>).id);
      }
    } catch {
      // Ignore lookup errors
    }

    // 1. Persist to account_deletions if user matched, and ALWAYS create a support ticket
    if (matchedUserId) {
      try {
        await admin.from('account_deletions').insert({
          user_id: matchedUserId,
          reason: `[${ticketId}] ${reason}${feedback ? ` — ${feedback}` : ''}`,
          action_type: 'delete',
          status: 'requested',
          requested_at: nowIso,
        });
      } catch {
        // Ignore constraint errors
      }
    }

    await admin.from('user_support_tickets').insert({
      user_id: matchedUserId,
      username: cleanedIdent.slice(0, 64),
      email: identifier.includes('@') ? identifier : null,
      category: 'account_deletion',
      subject: `Account Deletion Request [${ticketId}]`,
      description: `Identifier: ${identifier}\nReason: ${reason}\nLocale: ${locale}\nFeedback: ${feedback || 'None'}`,
      status: 'open',
      priority: 'high',
    });

    // 2. Dispatch real-time Telegram notification via server module
    const telegramMessage = [
      `🚨 <b>درخواست جدید حذف حساب کاربری زِو (ZEV)</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🎫 <b>کد رهگیری:</b> <code>${escapeTelegramHtml(ticketId)}</code>`,
      `👤 <b>شناسه / ایمیل / یوزرنیم:</b> <code>${escapeTelegramHtml(identifier)}</code>`,
      matchedUserId
        ? `🆔 <b>User UUID:</b> <code>${escapeTelegramHtml(matchedUserId)}</code>`
        : '',
      `📋 <b>دلیل حذف:</b> ${escapeTelegramHtml(reason)}`,
      `💬 <b>توضیحات و بازخورد:</b> ${escapeTelegramHtml(feedback || 'بدون توضیحات اضافی')}`,
      `🌐 <b>زبان وب‌سایت:</b> ${escapeTelegramHtml(locale.toUpperCase())}`,
      `⏰ <b>زمان ثبت (کابل):</b> ${escapeTelegramHtml(nowKabul)}`,
      `🔒 <b>پذیرش حذف داده‌ها:</b> بله (درخواست دائمی)`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <i>سامانه تایید و حذف حساب zevapp.com (web.zevapp.com)</i>`,
    ]
      .filter(Boolean)
      .join('\n');

    await dispatchTelegramHtml(telegramMessage);

    return NextResponse.json({
      success: true,
      ticketId,
      message:
        locale === 'fa'
          ? 'درخواست حذف حساب شما با موفقیت دریافت و کد پیگیری صادر شد.'
          : locale === 'ps'
          ? 'د اکاونټ د ړنګولو غوښتنه مو په بریا ثبت او د تعقیب شمېره صادره شوه.'
          : 'Your account deletion request has been submitted successfully.',
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'Unexpected server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
