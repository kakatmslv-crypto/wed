import { useEffect, useMemo, useState } from 'react';
import { Download, ExternalLink, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { Lang } from '../types/invitation';

type ChatChannel = 'whatsapp' | 'telegram';

interface ChatQrSectionProps {
  contactPhone?: string;
  groomName: string;
  brideName: string;
  lang: Lang;
  onToast?: (msg: string) => void;
}

export function ChatQrSection({
  contactPhone = '071 947 4667',
  groomName,
  brideName,
  lang,
  onToast,
}: ChatQrSectionProps) {
  const [channel, setChannel] = useState<ChatChannel>('whatsapp');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const { displayPhone, e164Digits } = useMemo(() => {
    const raw = (contactPhone || '071 947 4667').trim();
    const cleaned = raw.replace(/[^\d+]/g, '');
    const normalized = cleaned.startsWith('0')
      ? `855${cleaned.slice(1)}`
      : cleaned.replace(/^\+/, '');
    return {
      displayPhone: raw,
      e164Digits: normalized,
    };
  }, [contactPhone]);

  const chatUrl = useMemo(() => {
    if (!e164Digits) return '';
    if (channel === 'whatsapp') {
      const greeting =
        lang === 'km'
          ? `សួស្តី! សូមចូលរួមអបអរសាទរពិធីភ្ជាប់ពាក្យរបស់ ${groomName} និង ${brideName}`
          : `Hello! Reaching out regarding the engagement ceremony of ${groomName} & ${brideName}.`;
      return `https://wa.me/${e164Digits}?text=${encodeURIComponent(greeting)}`;
    }
    return `https://t.me/+${e164Digits}`;
  }, [channel, e164Digits, groomName, brideName, lang]);

  useEffect(() => {
    let active = true;
    if (!chatUrl) {
      setQrDataUrl('');
      return;
    }

    QRCode.toDataURL(chatUrl, {
      width: 360,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#2B241C',
        light: '#FFFDF7',
      },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl('');
      });

    return () => {
      active = false;
    };
  }, [chatUrl]);

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `contact-${channel}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast?.(
      lang === 'km' ? 'បានទាញយករូប QR រួចរាល់!' : 'QR code image downloaded!'
    );
  };

  if (!e164Digits) return null;

  return (
    <section id="qr-chat-section" className="no-print scroll-mt-6 space-y-4">
      <div className="text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
          Direct Message QR
        </p>
        <h3 className="font-moul text-base champagne-title mt-0.5">
          {lang === 'km' ? 'ស្កេន QR ដើម្បីទំនាក់ទំនង' : 'Scan QR to Chat'}
        </h3>
        <p className="text-[11px] text-[#5C5449] mt-0.5">
          {lang === 'km'
            ? 'ស្កេនកូដខាងក្រោមដើម្បីផ្ញើសារជូនពរ ឬសាកសួរព័ត៌មានភ្លាមៗ'
            : 'Scan with your camera to start a chat directly'}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow flex flex-col items-center text-center space-y-4">
        {/* Channel Switcher */}
        <div
          role="tablist"
          aria-label="Messaging platform"
          className="inline-flex items-center gap-1 p-1 bg-[#EFE8D8] rounded-xl"
        >
          <button
            type="button"
            role="tab"
            aria-selected={channel === 'whatsapp'}
            onClick={() => setChannel('whatsapp')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition whitespace-nowrap shrink-0 ${
              channel === 'whatsapp'
                ? 'bg-white text-[#1A1714] shadow-2xs'
                : 'text-[#5C5449] hover:text-[#1A1714]'
            }`}
          >
            WhatsApp
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={channel === 'telegram'}
            onClick={() => setChannel('telegram')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition whitespace-nowrap shrink-0 ${
              channel === 'telegram'
                ? 'bg-white text-[#1A1714] shadow-2xs'
                : 'text-[#5C5449] hover:text-[#1A1714]'
            }`}
          >
            Telegram
          </button>
        </div>

        {/* Scannable QR Display */}
        <div className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#D8C59B]">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={
                lang === 'km'
                  ? `QR កូដសម្រាប់ជជែកតាម ${channel === 'whatsapp' ? 'WhatsApp' : 'Telegram'} លេខ ${displayPhone}`
                  : `QR code linking to ${channel} chat for ${displayPhone}`
              }
              className="w-44 h-44 rounded-lg block"
            />
          ) : (
            <div className="w-44 h-44 rounded-lg bg-[#FAF6EE] flex flex-col items-center justify-center text-[#8D6E36] gap-2">
              <QrCode className="w-8 h-8 opacity-65" />
              <span className="text-[11px]">
                {lang === 'km' ? 'កំពុងបង្កើត QR...' : 'Generating QR...'}
              </span>
            </div>
          )}
        </div>

        {/* Unboxed Clean Phone & Platform Label */}
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-[#1A1714]">
            {channel === 'whatsapp' ? 'WhatsApp' : 'Telegram'} ·{' '}
            <span className="tabular-nums">{displayPhone}</span>
          </p>
          <p className="text-[11px] text-[#6E6356]">
            {lang === 'km'
              ? 'ចុចប៊ូតុងខាងក្រោម ឬស្កេនកូដដោយកាមេរ៉ាទូរស័ព្ទ'
              : 'Tap below or scan with your phone camera'}
          </p>
        </div>

        {/* Direct Actions */}
        <div className="w-full grid grid-cols-2 gap-2 pt-1">
          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2B241C] hover:bg-[#3F352A] text-[#FAF6EE] text-xs font-medium transition whitespace-nowrap shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#DFC282]" />
            <span>
              {lang === 'km'
                ? channel === 'whatsapp'
                  ? 'បើក WhatsApp'
                  : 'បើក Telegram'
                : `Open ${channel === 'whatsapp' ? 'WhatsApp' : 'Telegram'}`}
            </span>
          </a>

          <button
            type="button"
            onClick={handleDownloadQr}
            disabled={!qrDataUrl}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF7F0] hover:bg-[#F3ECDC] border border-[#D8C59B] text-[#1A1714] text-xs font-medium cursor-pointer transition whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-[#8D6E36]" />
            <span>{lang === 'km' ? 'រក្សាទុក QR' : 'Save QR'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
