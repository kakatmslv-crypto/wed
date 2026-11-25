interface CornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
}

export function KhmerCornerOrnament({ position, className = '' }: CornerProps) {
  const transforms: Record<CornerProps['position'], string> = {
    tl: '',
    tr: 'scale(-1, 1)',
    bl: 'scale(1, -1)',
    br: 'scale(-1, -1)',
  };

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={`w-10 h-10 text-[#9E7B3B] pointer-events-none select-none ${className}`}
      style={{ transform: transforms[position] }}
    >
      <path
        d="M8 72V18C8 12.477 12.477 8 18 8H72"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
      <path
        d="M14 64V20C14 16.686 16.686 14 20 14H64"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.35"
      />
      <path
        d="M14 29C20 29 24.5 24.5 24.5 18.5C24.5 22 28 25.5 33 25.5C28 28 25.5 32.5 25.5 37.5C23 32.5 18.5 29.8 14 29Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
        strokeOpacity="0.75"
      />
      <circle cx="19" cy="19" r="1.8" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

export function KhmerLotusDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3.5 my-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 max-w-[96px] bg-gradient-to-r from-transparent via-[#9E7B3B]/40 to-[#9E7B3B]/70" />
      <svg viewBox="0 0 64 28" fill="none" className="w-10 h-5 text-[#9E7B3B]">
        <path
          d="M32 4C34.5 9.8 36 14 32 20.5C28 14 29.5 9.8 32 4Z"
          stroke="currentColor"
          strokeWidth="1.05"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M32 20.5C36 19 40.5 15 42.5 9.5C37 11 34 14.5 32 20.5Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M32 20.5C28 19 23.5 15 21.5 9.5C27 11 30 14.5 32 20.5Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M17 21C22 21 27 22.2 32 24C37 22.2 42 21 47 21"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </svg>
      <div className="h-px flex-1 max-w-[96px] bg-gradient-to-l from-transparent via-[#9E7B3B]/40 to-[#9E7B3B]/70" />
    </div>
  );
}
