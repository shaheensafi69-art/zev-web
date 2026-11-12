export function escapeTelegramHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getTelegramTargets(): Array<{ token: string; chatId: string }> {
  const token1 = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
  const chatId1 = (process.env.TELEGRAM_CHAT_ID || '').trim();

  const token2 = (process.env.TELEGRAM_BOT_TOKEN2 || '').trim();
  const chatId2 = (process.env.TELEGRAM_CHAT_ID2 || chatId1).trim();

  const targets: Array<{ token: string; chatId: string }> = [];
  if (token1 && chatId1) targets.push({ token: token1, chatId: chatId1 });
  if (token2 && chatId2 && (token2 !== token1 || chatId2 !== chatId1)) {
    targets.push({ token: token2, chatId: chatId2 });
  }
  return targets;
}

export async function dispatchTelegramHtml(htmlText: string): Promise<{ sent: boolean; attempts: number }> {
  const targets = getTelegramTargets();
  let attempts = 0;

  for (const target of targets) {
    attempts += 1;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`https://api.telegram.org/bot${target.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: target.chatId,
          text: htmlText,
          parse_mode: 'HTML',
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        const json = (await res.json()) as { ok?: boolean };
        if (json?.ok) {
          return { sent: true, attempts };
        }
      }
    } catch {
      // Fail over to secondary bot
    }
  }

  return { sent: false, attempts };
}
