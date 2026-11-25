import { useState } from 'react';
import { CalendarPlus, Copy, Download, PenLine, Printer } from 'lucide-react';
import { formatKhmerInvitationPlainText } from '../data/defaultInvitation';
import { InvitationData, Lang, PaperPalette } from '../types/invitation';
import { downloadEngagementIcs } from '../utils/calendar';
import { exportInvitationCardPng } from '../utils/exportCardPng';
import { KhmerCornerOrnament, KhmerLotusDivider } from './KhmerOrnament';
import { ResilientImage } from './ResilientImage';

interface FormalInvitationCardProps {
  data: InvitationData;
  lang: Lang;
  onToast: (msg: string) => void;
  onOpenEditor: () => void;
}

const PALETTE_OVERLAY: Record<PaperPalette, string> = {
  alabaster: 'bg-[#FFF9E8]/45',
  ivory: 'bg-[#FAF0D7]/50',
  limestone: 'bg-[#F3E4C0]/55',
};

export function FormalInvitationCard({
  data,
  lang,
  onToast,
  onOpenEditor,
}: FormalInvitationCardProps) {
  const [exportingPng, setExportingPng] = useState(false);
  const overlayTint = PALETTE_OVERLAY[data.palette] ?? PALETTE_OVERLAY.alabaster;

  const handleCopyText = async () => {
    const text = formatKhmerInvitationPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    onToast(lang === 'km' ? 'បានចម្លងអត្ថបទធៀបរួចរាល់!' : 'Invitation text copied!');
  };

  const handleDownloadCardImage = async () => {
    if (exportingPng) return;
    setExportingPng(true);
    try {
      await exportInvitationCardPng(data, lang);
      onToast(
        lang === 'km'
          ? 'បានទាញយករូបធៀប 9:16 សម្រាប់ចែករំលែករួចរាល់!'
          : '9:16 stationery card image downloaded!'
      );
    } catch {
      onToast(
        lang === 'km'
          ? 'មិនអាចទាញយករូបភាពបានទេ សូមសាកល្បងម្តងទៀត!'
          : 'Could not export image. Please try again.'
      );
    } finally {
      setExportingPng(false);
    }
  };

  return (
    <section id="invitation-card" className="scroll-mt-6 space-y-3">
      {/* 9:16 Golden Khmer Engagement Stationery Card */}
      <article className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-[#C29747]/80 couture-card-shadow text-center select-text">
        {/* Background: Golden Satin, Embossed Khmer Kbach Border, Jasmine & Rice Stalks */}
        <ResilientImage
          src="/src/assets/images/gold_stationery_back_9x16_1795572611798.jpg"
          alt="ផ្ទាំងសំបុត្រមាសប្រណីត ក្បាច់ខ្មែរ ផ្កាម្លិះ និងកួរស្រូវមាស"
          fallbackTitle="សិរីមង្គលពិធីភ្ជាប់ពាក្យ"
          className="absolute inset-0 w-full h-full object-cover scale-[1.16]"
        />

        {/* Soft Radial Warm Gold-Ivory Lighting Veil for Crisp Text Legibility */}
        <div
          className={`absolute inset-0 ${overlayTint} [mask-image:radial-gradient(ellipse_84%_80%_at_50%_50%,black_55%,transparent_100%)]`}
        />

        {/* Full-Width Centered Typography Inside Carved Golden Frame */}
        <div className="relative z-10 h-full w-full p-3 sm:p-3.5 flex flex-col justify-between">
          <div className="relative flex-1 w-full rounded-xl border border-[#B88C3A]/65 bg-gradient-to-b from-[#FFFDF7]/78 via-[#FFF9EA]/68 to-[#FFFDF5]/82 backdrop-blur-[2px] shadow-[inset_0_0_0_3px_rgba(255,252,243,0.78),inset_0_0_0_4px_rgba(184,140,58,0.26),0_10px_28px_-10px_rgba(92,62,14,0.22)] px-3.5 py-2.5 sm:px-4 sm:py-3.5 flex flex-col justify-between overflow-hidden">
            {/* Carved Khmer Corner Ornaments */}
            <KhmerCornerOrnament position="tl" className="absolute top-1 left-1 !w-7 !h-7 sm:!w-8 sm:!h-8 opacity-85" />
            <KhmerCornerOrnament position="tr" className="absolute top-1 right-1 !w-7 !h-7 sm:!w-8 sm:!h-8 opacity-85" />
            <KhmerCornerOrnament position="bl" className="absolute bottom-1 left-1 !w-7 !h-7 sm:!w-8 sm:!h-8 opacity-85" />
            <KhmerCornerOrnament position="br" className="absolute bottom-1 right-1 !w-7 !h-7 sm:!w-8 sm:!h-8 opacity-85" />

            {/* Top: Khmer Decorative Symbol & Main Heading */}
            <header className="relative z-10 pt-0.5 space-y-0.5">
              <KhmerLotusDivider className="!my-0.5 scale-90" />
              <h2 className="font-moul text-[16px] sm:text-[18px] champagne-title leading-snug drop-shadow-[0_1px_0_rgba(255,255,255,0.85)]">
                {lang === 'km' ? data.ceremonyHeadline : data.ceremonyHeadlineEn}
              </h2>
              <p className="text-[9px] tracking-[0.26em] uppercase font-editorial text-[#8A6629]">
                {lang === 'km' ? 'Engagement Ceremony' : data.ceremonyHeadline}
              </p>
            </header>

            {/* Parents Honored Quietly */}
            <div className="relative z-10 text-[10.5px] sm:text-[11.5px] text-[#453829] leading-snug space-y-0.5 w-full py-1">
              <div className="flex items-center justify-center gap-2 pb-0.5">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B88D3D]/55" />
                <p className="text-[10px] sm:text-[10.5px] font-semibold text-[#7A5920]">
                  {lang === 'km' ? 'មាតាបិតាទាំងសងខាង' : 'With the blessings of both families'}
                </p>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B88D3D]/55" />
              </div>
              <p className="font-medium">
                {lang === 'km'
                  ? `${data.groomFather} និង ${data.groomMother}`
                  : `${data.groomFatherEn} & ${data.groomMotherEn}`}
              </p>
              <p className="font-medium">
                {lang === 'km'
                  ? `${data.brideFather} និង ${data.brideMother}`
                  : `${data.brideFatherEn} & ${data.brideMotherEn}`}
              </p>
            </div>

            {/* Center: Prominent Gold Lettering Couple Names */}
            <div className="relative z-10 py-1 px-2 space-y-0.5 w-full bg-[radial-gradient(ellipse_at_center,rgba(255,252,242,0.88)_0%,transparent_74%)]">
              <p className="font-moul text-[21px] sm:text-[24px] champagne-title leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]">
                {lang === 'km' ? data.groomName : data.groomNameEn}
              </p>
              <div className="flex items-center justify-center gap-2.5">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B88D3D]/60" />
                <span className="font-editorial italic text-sm sm:text-base text-[#9A7430] leading-none">
                  &amp;
                </span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B88D3D]/60" />
              </div>
              <p className="font-moul text-[21px] sm:text-[24px] champagne-title leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]">
                {lang === 'km' ? data.brideName : data.brideNameEn}
              </p>
            </div>

            {/* Invitation Message */}
            <div className="relative z-10 space-y-0.5 w-full px-1">
              <p className="font-moul text-[11.5px] sm:text-[13px] text-[#7D5B20]">
                {lang === 'km' ? data.guestHonorific : 'Cordially Invite'}
              </p>
              <p className="text-[11px] sm:text-[11.5px] text-[#33281D] leading-[1.6] w-full">
                {lang === 'km' ? data.invitationLead : data.invitationLeadEn}
              </p>
            </div>

            {/* Event Details Plaque */}
            <div className="relative z-10 w-full rounded-xl bg-gradient-to-b from-[#FFFDF7]/95 to-[#FBF2DC]/90 border border-[#C29747]/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_4px_14px_-6px_rgba(110,78,24,0.18)] px-3 py-2 sm:px-3.5 sm:py-2.5 space-y-0.5 text-[10.5px] sm:text-[11.5px] text-[#2D251C]">
              <p className="font-moul text-[11px] sm:text-xs text-[#6E4D16]">
                {lang === 'km' ? data.gregorianDate : data.gregorianDateEn}
              </p>
              <p className="text-[9.5px] sm:text-[10px] text-[#6B5D4D]">({data.lunarDate})</p>
              <div className="h-px w-20 mx-auto my-0.5 bg-gradient-to-r from-transparent via-[#C29747]/45 to-transparent" />
              <p className="font-medium text-[#2A2218]">
                {lang === 'km'
                  ? `វេលាម៉ោង ${data.morningTime} (${data.morningActivity})`
                  : `${data.morningTimeEn} (${data.morningActivityEn})`}
              </p>
              <p className="text-[10px] sm:text-[10.5px] text-[#5B4F40]">
                {lang === 'km'
                  ? `និង ${data.noonTime} (${data.noonActivity})`
                  : `& ${data.noonTimeEn} (${data.noonActivityEn})`}
              </p>
              <p className="text-[10.5px] sm:text-[11px] font-medium text-[#433628] pt-0.5 leading-snug">
                {lang === 'km' ? `ទីតាំង៖ ${data.venueAddress}` : `Location: ${data.venueAddressEn}`}
              </p>
            </div>

            {/* Footer Blessing */}
            <footer className="relative z-10 pb-0.5 px-2 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-[#6B5125] leading-relaxed">
                {lang === 'km' ? data.closingMessage : data.closingMessageEn}
              </p>
            </footer>
          </div>
        </div>
      </article>

      {/* Share & Export Utility Grid Under 9:16 Card */}
      <div className="no-print grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleDownloadCardImage}
          disabled={exportingPng}
          className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8D6A2E] via-[#B48D44] to-[#8D6A2E] hover:brightness-105 text-[#FFFDF9] text-xs font-semibold shadow-sm cursor-pointer transition disabled:opacity-60"
        >
          <Download className="w-3.5 h-3.5" />
          <span>
            {exportingPng
              ? lang === 'km'
                ? 'កំពុងបង្កើតរូបធៀប...'
                : 'Generating 9:16 Image...'
              : lang === 'km'
              ? 'ទាញយករូបធៀប 9:16 (PNG)'
              : 'Download 9:16 Invitation Image (PNG)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            downloadEngagementIcs(data);
            onToast(
              lang === 'km'
                ? 'បានទាញយកកាលវិភាគចូលប្រតិទិន!'
                : 'Calendar event (.ics) downloaded!'
            );
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#D8C59B] text-[#2B241C] hover:bg-[#F5EFE2] text-xs font-medium cursor-pointer transition whitespace-nowrap"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-[#8D6E36]" />
          <span>{lang === 'km' ? 'រក្សាទុកប្រតិទិន' : 'Save Date'}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#D8C59B] text-[#2B241C] hover:bg-[#F5EFE2] text-xs font-medium cursor-pointer transition whitespace-nowrap"
        >
          <Copy className="w-3.5 h-3.5 text-[#8D6E36]" />
          <span>{lang === 'km' ? 'ចម្លងអត្ថបទធៀប' : 'Copy Text'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenEditor}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#D8C59B] text-[#2B241C] hover:bg-[#F5EFE2] text-xs font-medium cursor-pointer transition whitespace-nowrap"
        >
          <PenLine className="w-3.5 h-3.5 text-[#8D6E36]" />
          <span>{lang === 'km' ? 'កែសម្រួលធៀប' : 'Customize'}</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2B241C] hover:bg-[#3F352A] text-[#FAF6EE] text-xs font-medium cursor-pointer transition whitespace-nowrap"
        >
          <Printer className="w-3.5 h-3.5 text-[#DFC282]" />
          <span>{lang === 'km' ? 'បោះពុម្ពធៀប' : 'Print Card'}</span>
        </button>
      </div>
    </section>
  );
}
