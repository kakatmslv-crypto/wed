import { Phone, Send } from 'lucide-react';
import { Lang } from '../types/invitation';

interface RsvpWishesSectionProps {
  groomName: string;
  brideName: string;
  contactPhone?: string;
  lang: Lang;
  onToast?: (msg: string) => void;
}

export function RsvpWishesSection({
  groomName,
  brideName,
  contactPhone = '071 947 4667',
  lang,
}: RsvpWishesSectionProps) {
  const phoneDigits = contactPhone.replace(/[^\d+]/g, '');
  const telegramPhone = phoneDigits.startsWith('0')
    ? `+855${phoneDigits.slice(1)}`
    : phoneDigits;

  return (
    <section id="rsvp-section" className="no-print scroll-mt-6 space-y-4">
      <div className="text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
          Wishes &amp; Contact
        </p>
        <h3 className="font-moul text-base champagne-title mt-0.5">
          {lang === 'km' ? 'ពាក្យជូនពរ និងទំនាក់ទំនង' : 'Guest Wishes & Contact'}
        </h3>
        <p className="text-[11px] text-[#5C5449] mt-0.5">
          {lang === 'km'
            ? `ផ្ញើពាក្យជូនពរដល់ ${groomName} និង ${brideName} តាមរយៈ Telegram ឬទូរស័ព្ទ`
            : `Send wishes to ${groomName} & ${brideName} directly via Telegram or phone`}
        </p>
      </div>

      {contactPhone && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] text-[#8D6E36]">
                {lang === 'km' ? 'ទំនាក់ទំនងម្ចាស់ពិធីដោយផ្ទាល់' : 'Direct Host Contact'}
              </p>
              <p className="text-sm font-semibold text-[#1A1714] tabular-nums mt-0.5">
                {contactPhone}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3ECDC] border border-[#D8C59B] text-xs font-medium text-[#1A1714] transition whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#8D6E36]" />
                <span>{lang === 'km' ? 'ទូរស័ព្ទ' : 'Call'}</span>
              </a>
              <a
                href={`https://t.me/${telegramPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#229ED9] hover:bg-[#1B89BD] text-white text-xs font-medium transition whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
