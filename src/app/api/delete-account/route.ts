import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, reason, feedback, confirmDataLoss, locale = 'fa' } = body;

    if (!identifier || typeof identifier !== 'string' || identifier.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'لطفاً نام کاربری، ایمیل یا شماره موبایل معتبر وارد کنید.' },
        { status: 400 }
      );
    }

    if (!confirmDataLoss) {
      return NextResponse.json(
        { success: false, error: 'برای ادامه، تایید آگاهی از حذف دائمی اطلاعات الزامی است.' },
        { status: 400 }
      );
    }

    const ticketId = 'ZEV-DEL-' + Math.floor(100000 + Math.random() * 900000);
    const nowIso = new Date().toISOString();
    const nowKabul = new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Kabul' });

    // 1. Attempt logging to Supabase (if table exists)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/account_deletion_requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            ticket_id: ticketId,
            identifier: identifier.trim(),
            reason: reason || 'Not Specified',
            feedback: feedback || '',
            locale,
            status: 'pending',
            created_at: nowIso,
          }),
        });
      } catch (dbErr) {
        console.warn('Supabase log warning (proceeding):', dbErr);
      }
    }

    // 2. Dispatch real-time Telegram notification
    const botToken1 = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId1 = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    const botToken2 = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2;
    const chatId2 = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2;

    const telegramMessage = `
🚨 <b>درخواست جدید حذف حساب کاربری زِو (ZEV)</b>
━━━━━━━━━━━━━━━━━━━━
🎫 <b>کد رهگیری:</b> <code>${ticketId}</code>
👤 <b>شناسه / ایمیل / یوزرنیم:</b> <code>${identifier.trim()}</code>
📋 <b>دلیل حذف:</b> ${reason || 'ذکر نشده'}
💬 <b>توضیحات و بازخورد:</b> ${feedback ? feedback.trim() : 'بدون توضیحات اضافی'}
🌐 <b>زبان وب‌سایت:</b> ${locale.toUpperCase()}
⏰ <b>زمان ثبت (کابل):</b> ${nowKabul}
🔒 <b>پذیرش حذف داده‌ها:</b> بله (درخواست دائمی)
━━━━━━━━━━━━━━━━━━━━
🌐 <i>سامانه تایید و حذف حساب zevapp.com (web.zevapp.com)</i>
    `.trim();

    let telegramSent = false;

    // Send via Primary Telegram Bot
    if (botToken1 && chatId1) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken1}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId1,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        });
        const tgData = await tgRes.json();
        if (tgData.ok) {
          telegramSent = true;
        }
      } catch (err) {
        console.error('Telegram bot 1 error:', err);
      }
    }

    // Fallback or secondary notification
    if (!telegramSent && botToken2 && chatId2) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken2}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId2,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        });
      } catch (err) {
        console.error('Telegram bot 2 error:', err);
      }
    }

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
  } catch (error: any) {
    console.error('Delete account API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'خطای غیرمنتظره در سرور' },
      { status: 500 }
    );
  }
}
