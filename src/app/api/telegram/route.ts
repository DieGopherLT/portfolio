import { NextRequest } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, locale = 'en' }: ContactData = body;

    if (!name || !email || !subject || !message) {
      return Response.json({ message: 'All fields are required' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram configuration');
      return Response.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const bot = new TelegramBot(botToken);

    // Use locale to determine message template
    const messageText = locale === 'es'
      ? `
🔔 *Nuevo mensaje del portfolio*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
📝 *Asunto:* ${subject}

💬 *Mensaje:*
${message}
      `.trim()
      : `
🔔 *New portfolio message*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Subject:* ${subject}

💬 *Message:*
${message}
      `.trim();

    await bot.sendMessage(chatId, messageText, { parse_mode: 'Markdown' });

    return Response.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return Response.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
