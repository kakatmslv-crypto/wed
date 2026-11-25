import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, PenLine } from 'lucide-react';
import { BottomDock } from './components/BottomDock';
import { ChatQrSection } from './components/ChatQrSection';
import { CountdownStrip } from './components/CountdownStrip';
import { EnvelopeCover } from './components/EnvelopeCover';
import { FormalInvitationCard } from './components/FormalInvitationCard';
import { InvitationEditorModal } from './components/InvitationEditorModal';
import { MusicPlayerButton } from './components/MusicPlayerButton';
import { PhotoGalleryLightbox } from './components/PhotoGalleryLightbox';
import { ResilientImage } from './components/ResilientImage';
import { RoyalCeremonyFeatures } from './components/RoyalCeremonyFeatures';
import { RsvpWishesSection } from './components/RsvpWishesSection';
import { ScheduleAndVenue } from './components/ScheduleAndVenue';
import { DEFAULT_INVITATION, ENGAGEMENT_GALLERY } from './data/defaultInvitation';
import { InvitationData, Lang } from './types/invitation';

const INVITATION_STORAGE_KEY = 'khmer_engagement_invitation_data_v3';

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 opacity-75 py-1" aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B6904B]" />
      <span className="w-1.5 h-1.5 rotate-45 border border-[#B6904B]" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B6904B]" />
    </div>
  );
}

export default function App() {
  const [invitation, setInvitation] = useState<InvitationData>(() => {
    try {
      const saved = window.localStorage.getItem(INVITATION_STORAGE_KEY);
      if (saved) {
        const merged = { ...DEFAULT_INVITATION, ...JSON.parse(saved) };
        if (merged.brideMother === 'លោកស្រី ស៊នឡុងអែង') {
          merged.brideMother = DEFAULT_INVITATION.brideMother;
        }
        return merged;
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_INVITATION;
  });

  const [lang, setLang] = useState<Lang>('km');
  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(invitation));
    } catch {
      // Ignore storage write errors
    }
  }, [invitation]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleOpenEnvelope = () => {
    if (envelopeOpening) return;
    setEnvelopeOpening(true);
    setIsMusicPlaying(true);
    window.setTimeout(() => {
      setEnvelopeVisible(false);
    }, 1100);
  };

  const handleReopenCover = () => {
    setEnvelopeVisible(true);
    setEnvelopeOpening(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollTo = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleLang = () => {
    const next: Lang = lang === 'km' ? 'en' : 'km';
    setLang(next);
    showToast(next === 'km' ? 'បានប្តូរជាភាសាខ្មែរ' : 'Switched to English');
  };

  return (
    <div className="min-h-screen w-full bg-[#DFCCA3] bg-[radial-gradient(circle_at_top,rgba(255,247,224,0.85),rgba(208,180,122,0.92))] flex items-center justify-center sm:p-4 select-none">
      {/* Toast Notification */}
      {toast && (
        <div className="no-print fixed top-5 left-1/2 -translate-x-1/2 z-[120] bg-[#2B241C] text-[#FAF6EE] border border-[#C9A86A]/70 px-4 py-2 rounded-full text-xs shadow-2xl flex items-center gap-2 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-[#DFC282] shrink-0" />
          <span className="truncate">{toast}</span>
        </div>
      )}

      {/* Centered 9:16 Golden Khmer Smartphone Stationery Shell */}
      <div className="print-frame relative w-full max-w-[430px] h-[100dvh] sm:h-[92vh] sm:max-h-[880px] bg-[#F7EED8] sm:rounded-[34px] border-0 sm:border sm:border-[#B68934]/65 shadow-[0_26px_74px_rgba(92,64,18,0.28)] overflow-hidden flex flex-col">
        {/* Double-Door Warm Ivory & Champagne Silk Envelope Cover */}
        <EnvelopeCover
          data={invitation}
          lang={lang}
          isOpening={envelopeOpening}
          isVisible={envelopeVisible}
          onOpen={handleOpenEnvelope}
        />

        {/* Top Floating Action Bar */}
        <header
          className={`no-print absolute top-0 inset-x-0 z-40 pt-3.5 px-4 flex items-center justify-between transition-all duration-300 ${
            envelopeVisible || isLightboxOpen
              ? 'opacity-0 pointer-events-none -translate-y-4'
              : 'opacity-100 pointer-events-auto translate-y-0'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReopenCover}
              className="h-8 px-2.5 rounded-full bg-[#2B241C]/70 hover:bg-[#2B241C]/90 backdrop-blur-md border border-[#DFC282]/60 flex items-center gap-1.5 text-[#FAF3E3] text-[10px] font-medium cursor-pointer transition whitespace-nowrap"
              title={lang === 'km' ? 'មើលមុខសំបុត្រឡើងវិញ' : 'View Cover'}
            >
              <Mail className="w-3.5 h-3.5 text-[#DFC282]" />
              <span>{lang === 'km' ? 'មុខសំបុត្រ' : 'Cover'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="h-8 px-2.5 rounded-full bg-[#2B241C]/70 hover:bg-[#2B241C]/90 backdrop-blur-md border border-[#DFC282]/60 flex items-center gap-1 text-[#FAF3E3] text-[10px] font-medium cursor-pointer transition whitespace-nowrap"
              title={lang === 'km' ? 'កែសម្រួលធៀប' : 'Edit Template'}
            >
              <PenLine className="w-3 h-3 text-[#DFC282]" />
              <span>{lang === 'km' ? 'កែធៀប' : 'Edit'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <MusicPlayerButton
              lang={lang}
              isPlaying={isMusicPlaying}
              setIsPlaying={setIsMusicPlaying}
              onToast={showToast}
            />

            <button
              type="button"
              onClick={toggleLang}
              className="h-8 px-2.5 rounded-full bg-[#FFFDF9]/95 hover:bg-white shadow-sm border border-[#D8C59B] flex items-center gap-1.5 cursor-pointer transition whitespace-nowrap"
              title={lang === 'km' ? 'Switch to English' : 'ប្តូរជាភាសាខ្មែរ'}
            >
              {lang === 'km' ? (
                <svg className="w-4 h-3 rounded-xs shrink-0" viewBox="0 0 900 600" aria-hidden="true">
                  <rect fill="#032ea1" width="900" height="600" />
                  <rect fill="#e00025" y="150" width="900" height="300" />
                  <g fill="#fff">
                    <path d="M450,210 L457,235 L443,235 Z M420,230 L425,245 L415,245 Z M480,230 L485,245 L475,245 Z" />
                    <rect x="410" y="245" width="80" height="35" />
                    <rect x="380" y="275" width="140" height="30" />
                  </g>
                </svg>
              ) : (
                <span className="text-[10px] font-semibold text-[#2B241C]">EN</span>
              )}
              <span className="text-[10px] font-semibold text-[#2B241C]">
                {lang === 'km' ? 'KH' : 'KM'}
              </span>
            </button>
          </div>
        </header>

        {/* Scrollable Invitation Content */}
        <div
          ref={scrollContainerRef}
          id="main-scroll-body"
          className="print-scroll relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar"
        >
          {/* Warm Luminous Hero Photo Screen */}
          <section
            id="hero-photo-screen"
            className="no-print relative h-[82dvh] sm:h-[72vh] sm:max-h-[660px] w-full overflow-hidden flex flex-col justify-between items-center text-center text-white"
          >
            <ResilientImage
              src="/src/assets/images/cambodia_countryside_scenery_1795570954859.jpg"
              alt="ទេសភាពស្រុកស្រែខ្មែរ វាលស្រែ ដើមត្នោត និងពន្លឺព្រះអាទិត្យរះនាពេលព្រឹក"
              fallbackTitle="សិរីមង្គលពិធីភ្ជាប់ពាក្យ"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2A2116]/65 via-[#2A2116]/15 to-[#2A2116]/85" />

            <div className="relative z-10 pt-16 px-5 space-y-1.5">
              <p className="text-[11px] tracking-[0.2em] uppercase font-editorial text-[#F3DFB4]">
                {lang === 'km' ? 'សម្រស់ស្រុកស្រែ · ខេត្តត្បូងឃ្មុំ' : 'Countryside Heritage · Tbong Khmum'}
              </p>
              <h1 className="font-moul text-lg sm:text-xl champagne-hero-text drop-shadow">
                {lang === 'km' ? invitation.ceremonyHeadline : invitation.ceremonyHeadlineEn}
              </h1>
            </div>

            <div className="relative z-10 pb-8 px-6 space-y-4 w-full">
              <div className="space-y-1">
                <p className="font-moul text-2xl sm:text-[26px] text-[#FFFDF7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                  {lang === 'km' ? invitation.groomName : invitation.groomNameEn}
                </p>
                <p className="text-base font-editorial italic text-[#EBD29B]">&amp;</p>
                <p className="font-moul text-2xl sm:text-[26px] text-[#FFFDF7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                  {lang === 'km' ? invitation.brideName : invitation.brideNameEn}
                </p>
              </div>

              <div className="pt-2 border-t border-white/20 max-w-[260px] mx-auto text-xs text-[#F7EBD1] space-y-0.5">
                <p className="font-medium">
                  {lang === 'km' ? invitation.gregorianDate : invitation.gregorianDateEn}
                </p>
                <p className="text-[11px] text-[#EBD29B]">
                  {lang === 'km'
                    ? `វេលាម៉ោង ${invitation.morningTime} · ខេត្តត្បូងឃ្មុំ`
                    : `${invitation.morningTimeEn} · Tbong Khmum`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleScrollTo('invitation-card')}
                className="mx-auto inline-flex flex-col items-center gap-1 text-[11px] text-[#F3DFB4] hover:text-white cursor-pointer pt-1"
              >
                <span>{lang === 'km' ? 'អានធៀបអញ្ជើញ' : 'View Invitation Card'}</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </section>

          {/* Warm Ivory Stationery Body Sections */}
          <div className="px-4 pt-5 pb-24 space-y-7 silk-atelier-bg relative z-10">
            <FormalInvitationCard
              data={invitation}
              lang={lang}
              onToast={showToast}
              onOpenEditor={() => setIsEditorOpen(true)}
            />

            <SectionDivider />

            <CountdownStrip targetIso={invitation.eventIsoStart} lang={lang} />

            <SectionDivider />

            <ScheduleAndVenue data={invitation} lang={lang} onToast={showToast} />

            <SectionDivider />

            <RoyalCeremonyFeatures
              groomName={lang === 'km' ? invitation.groomName : invitation.groomNameEn}
              brideName={lang === 'km' ? invitation.brideName : invitation.brideNameEn}
              lang={lang}
              onToast={showToast}
            />

            <SectionDivider />

            <PhotoGalleryLightbox
              photos={ENGAGEMENT_GALLERY}
              lang={lang}
              onLightboxChange={setIsLightboxOpen}
            />

            <SectionDivider />

            <RsvpWishesSection
              groomName={lang === 'km' ? invitation.groomName : invitation.groomNameEn}
              brideName={lang === 'km' ? invitation.brideName : invitation.brideNameEn}
              contactPhone={invitation.contactPhone}
              lang={lang}
              onToast={showToast}
            />

            <SectionDivider />

            <ChatQrSection
              contactPhone={invitation.contactPhone}
              groomName={lang === 'km' ? invitation.groomName : invitation.groomNameEn}
              brideName={lang === 'km' ? invitation.brideName : invitation.brideNameEn}
              lang={lang}
              onToast={showToast}
            />

            {/* Ceremonial Footer */}
            <footer className="no-print pt-2 pb-4 px-2 text-center space-y-3">
              <div className="space-y-1">
                <span className="font-moul text-sm champagne-title block">
                  {lang === 'km' ? 'សូមអរព្រះគុណ និងអរគុណ' : 'With Sincere Gratitude'}
                </span>
                <p className="text-[11px] text-[#5C5449] leading-relaxed max-w-[320px] mx-auto">
                  {lang === 'km' ? invitation.closingMessage : invitation.closingMessageEn}
                </p>
              </div>
            </footer>
          </div>
        </div>

        {/* Bottom Floating Glass Dock */}
        <div
          className={`transition-all duration-300 ${
            envelopeVisible || isLightboxOpen
              ? 'opacity-0 pointer-events-none translate-y-6'
              : 'opacity-100 pointer-events-auto translate-y-0'
          }`}
        >
          <BottomDock lang={lang} onScrollTo={handleScrollTo} />
        </div>
      </div>

      {/* Live Customizer & Guest Link Generator Modal */}
      <InvitationEditorModal
        isOpen={isEditorOpen}
        data={invitation}
        onChange={setInvitation}
        onReset={() => setInvitation(DEFAULT_INVITATION)}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
}
