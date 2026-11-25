import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_STATUSES = new Set(['attending', 'wishing']);
const ALLOWED_SIDES = new Set(['groom', 'bride', 'both']);

function cleanText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLen);
}

function formatSideLabel(side: string): string {
  if (side === 'groom') return 'ខាងប្រុស (Groom Side)';
  if (side === 'bride') return 'ខាងស្រី (Bride Side)';
  return 'ទាំងសងខាង (Both Families)';
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '16kb' }));

  app.post('/api/wishes/telegram', async (req, res) => {
    const body = req.body as Record<string, unknown> | undefined;
    if (!body || typeof body !== 'object') {
      res.status(400).json({ ok: false, error: 'invalid_payload' });
      return;
    }

    const name = cleanText(body.name, 120);
    const message = cleanText(body.message, 1000);
    const coupleLabel = cleanText(body.coupleLabel, 150);
    const rawStatus = typeof body.status === 'string' ? body.status : '';
    const rawSide = typeof body.side === 'string' ? body.side : 'both';

    if (!name || !message || !ALLOWED_STATUSES.has(rawStatus) || !ALLOWED_SIDES.has(rawSide)) {
      res.status(400).json({ ok: false, error: 'validation_failed' });
      return;
    }

    const parsedCount = Number(body.guestCount);
    const guestCount =
      rawStatus === 'attending' && Number.isFinite(parsedCount)
        ? Math.min(50, Math.max(1, Math.round(parsedCount)))
        : 0;

    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() || '';
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || '';

    if (!botToken || !chatId) {
      res.json({ ok: true, delivered: false, reason: 'not_configured' });
      return;
    }

    const attendanceText =
      rawStatus === 'attending'
        ? `នឹងចូលរួម (${guestCount} នាក់)`
        : 'ផ្ញើពាក្យជូនពរ';

    const lines = [
      '💐 ពាក្យជូនពរ និងការបញ្ជាក់វត្តមានថ្មី',
      coupleLabel ? `💍 ពិធីភ្ជាប់ពាក្យ៖ ${coupleLabel}` : '💍 ពិធីភ្ជាប់ពាក្យ',
      '',
      `👤 ឈ្មោះភ្ញៀវ៖ ${name}`,
      `🎊 ការចូលរួម៖ ${attendanceText}`,
      `🏡 ភ្ញៀវខាង៖ ${formatSideLabel(rawSide)}`,
      `💌 ពាក្យជូនពរ៖\n${message}`,
    ];

    try {
      const endpoint = `https://api.telegram.org/bot${encodeURIComponent(botToken)}/sendMessage`;
      const tgResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join('\n'),
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!tgResponse.ok) {
        res.status(502).json({ ok: false, delivered: false, error: 'telegram_delivery_failed' });
        return;
      }

      res.json({ ok: true, delivered: true });
    } catch {
      res.status(502).json({ ok: false, delivered: false, error: 'telegram_delivery_failed' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
