import { useEffect, useState } from 'react';
import { MailOpen } from 'lucide-react';
import { InvitationData, Lang } from '../types/invitation';
import { KhmerHeartCrest } from './KhmerHeartCrest';

interface EnvelopeCoverProps {
  data: InvitationData;
  lang: Lang;
  isOpening: boolean;
  isVisible: boolean;
  onOpen: () => void;
}

export function EnvelopeCover({
  data,
  lang,
  isOpening,
  isVisible,
  onOpen,
}: EnvelopeCoverProps) {
  const [urlGuest, setUrlGuest] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('to') || params.get('guest') || params.get('name');
      if (guestParam && guestParam.trim()) {
        setUrlGuest(guestParam.trim());
      }
    } catch {
      // Ignore invalid URL query params
    }
  }, []);

  if (!isVisible) return null;

  const displayedGuest = urlGuest || (lang === 'km' ? 'លោកអ្នក និងក្រុមគ្រួសារ' : 'Honored Guest & Family');

  return (
    <div
      className={`no-print absolute inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isOpening ? 'envelope-open pointer-events-none' : ''
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* Left Brushed Champagne Gold & Khmer Kbach Envelope Door */}
      <div
        className={`envelope-door-left absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#CFA758] via-[#E6C782] to-[#EFE0B8] border-r border-[#9E7328]/70 z-20 overflow-hidden ${
          isOpening
            ? 'shadow-[inset_-14px_0_28px_rgba(142,101,31,0.45)]'
            : 'shadow-[6px_0_24px_rgba(92,63,18,0.22)]'
        }`}
      >
        <img
          src="/src/assets/images/gold_envelope_cover_9x16_1795572610519.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-[200%] max-w-none h-full object-cover scale-[1.42] origin-center opacity-85 mix-blend-multiply pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#B88934]/20 via-transparent to-[#FFF7E2]/35 pointer-events-none" />
        <div className="absolute inset-y-5 left-3.5 w-px bg-gradient-to-b from-transparent via-[#7F5818]/55 to-transparent pointer-events-none" />
      </div>

      {/* Right Brushed Champagne Gold & Khmer Kbach Envelope Door */}
      <div
        className={`envelope-door-right absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#CFA758] via-[#E6C782] to-[#EFE0B8] border-l border-[#9E7328]/70 z-20 overflow-hidden ${
          isOpening
            ? 'shadow-[inset_14px_0_28px_rgba(142,101,31,0.45)]'
            : 'shadow-[-6px_0_24px_rgba(92,63,18,0.22)]'
        }`}
      >
        <img
          src="/src/assets/images/gold_envelope_cover_9x16_1795572610519.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 right-0 -left-full w-[200%] max-w-none h-full object-cover scale-[1.42] origin-center opacity-85 mix-blend-multiply pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#B88934]/20 via-transparent to-[#FFF7E2]/35 pointer-events-none" />
        <div className="absolute inset-y-5 right-3.5 w-px bg-gradient-to-b from-transparent via-[#7F5818]/55 to-transparent pointer-events-none" />
      </div>

      {/* Envelope Front Content */}
      <div
        className={`relative z-30 flex flex-col items-center justify-between h-full w-full py-10 px-7 text-center transition-all duration-700 ${
          isOpening ? 'opacity-0 scale-105 blur-[2px]' : 'opacity-100 scale-100'
        }`}
      >
        <div className="space-y-1.5 pt-2">
          <p className="text-[11px] tracking-[0.22em] uppercase font-editorial text-[#5E3F0F] font-semibold">
            {lang === 'km' ? 'សិរីមង្គលវិវាហ៍' : 'Auspicious Engagement'}
          </p>
          <p className="font-moul text-lg sm:text-xl text-[#3E2707] drop-shadow-[0_1px_0_rgba(255,244,214,0.75)]">
            {lang === 'km' ? data.ceremonyHeadline : data.ceremonyHeadlineEn}
          </p>
        </div>

        <div className="space-y-4 my-auto">
          <div className="inline-block rounded-full p-1 bg-[#FFF9EA]/65 backdrop-blur-[2px] shadow-[0_10px_30px_rgba(112,78,20,0.2)]">
            <KhmerHeartCrest
              groomInitial={data.groomInitialKh}
              brideInitial={data.brideInitialKh}
              size="cover"
              variant="light"
            />
          </div>

          <div className="space-y-1.5 bg-[#FFF9EB]/72 backdrop-blur-[2px] border border-[#B68835]/45 rounded-2xl px-5 py-2.5 shadow-xs">
            <p className="font-moul text-base sm:text-lg text-[#3D2707]">
              {lang === 'km'
                ? `${data.groomName}  &  ${data.brideName}`
                : `${data.groomNameEn}  &  ${data.brideNameEn}`}
            </p>
            <p className="text-xs text-[#694917] font-medium tracking-wide">
              {lang === 'km' ? data.gregorianDate : data.gregorianDateEn}
            </p>
          </div>
        </div>

        <div className="w-full max-w-[290px] space-y-4 pb-1">
          <div className="bg-[#FFFBF0]/90 backdrop-blur-sm border border-[#A87B2A]/60 rounded-xl px-4 py-3 space-y-1 shadow-sm">
            <p className="text-[11px] font-medium text-[#7A5518]">
              {lang === 'km' ? 'សូមគោរពអញ្ជើញ' : 'Cordially Inviting'}
            </p>
            <p className="font-moul text-sm sm:text-base text-[#352206] truncate">
              {displayedGuest}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#6E4912] via-[#9E6E22] to-[#6E4912] hover:brightness-110 text-[#FFFDF5] font-medium text-sm shadow-[0_12px_28px_rgba(88,57,14,0.34)] border border-[#F3DC9F] flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MailOpen className="w-4 h-4 text-[#FBE7B2]" strokeWidth={1.85} />
            <span>{lang === 'km' ? 'បើកលិខិតអញ្ជើញ' : 'Open Invitation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
