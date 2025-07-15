import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('❌ Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Telegram API Error:', errorText); // Log exact Telegram error
      return NextResponse.json({ error: 'Telegram failed', details: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Route Error:', error); // Log unexpected server error
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
