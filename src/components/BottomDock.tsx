import { CalendarClock, Camera, Home, MapPin, Phone } from 'lucide-react';
import { Lang } from '../types/invitation';

interface BottomDockProps {
  lang: Lang;
  onScrollTo: (sectionId: string) => void;
}

export function BottomDock({ lang, onScrollTo }: BottomDockProps) {
  const navItems = [
    {
      id: 'hero-photo-screen',
      icon: Home,
      km: 'ទំព័រដើម',
      en: 'Home',
      isPrimary: true,
    },
    {
      id: 'itinerary-section',
      icon: CalendarClock,
      km: 'កម្មវិធី',
      en: 'Program',
      isPrimary: false,
    },
    {
      id: 'location-section',
      icon: MapPin,
      km: 'ទីតាំង',
      en: 'Venue',
      isPrimary: false,
    },
    {
      id: 'gallery-section',
      icon: Camera,
      km: 'រូបថត',
      en: 'Photos',
      isPrimary: false,
    },
    {
      id: 'rsvp-section',
      icon: Phone,
      km: 'ទំនាក់ទំនង',
      en: 'Contact',
      isPrimary: false,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="no-print absolute bottom-3 inset-x-4 z-40"
    >
      <div className="bg-[#FCFBF7]/95 backdrop-blur-xl rounded-full py-2 px-3 flex items-center justify-between shadow-[0_12px_36px_rgba(13,11,9,0.28)] border border-[#D8C59B]/80 max-w-[360px] mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onScrollTo(item.id)}
              className="flex flex-col items-center justify-center group focus:outline-none cursor-pointer px-1"
            >
              {item.isPrimary ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1A1714] via-[#2F281D] to-[#1A1714] text-[#F2E2BA] flex items-center justify-center shadow-md -mt-3 border-2 border-[#FAF7F0] group-active:scale-95 transition-transform">
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C5449] group-hover:text-[#1A1714] group-hover:bg-[#F3ECDC] group-active:scale-95 transition-all">
                  <Icon className="w-4 h-4" strokeWidth={1.65} />
                </div>
              )}
              <span className="text-[9px] text-[#5C5449] group-hover:text-[#1A1714] font-medium mt-0.5 whitespace-nowrap">
                {lang === 'km' ? item.km : item.en}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
