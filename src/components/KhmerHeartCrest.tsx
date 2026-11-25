interface KhmerHeartCrestProps {
  groomInitial: string;
  brideInitial: string;
  size?: 'cover' | 'card';
  variant?: 'dark' | 'light';
}

export function KhmerHeartCrest({
  groomInitial,
  brideInitial,
  size = 'cover',
  variant = 'light',
}: KhmerHeartCrestProps) {
  const dimension =
    size === 'cover'
      ? 'w-[205px] h-[205px] sm:w-[225px] sm:h-[225px]'
      : 'w-[162px] h-[162px] sm:w-[178px] sm:h-[178px]';

  const isDark = variant === 'dark';

  return (
    <div
      className={`relative mx-auto flex items-center justify-center select-none ${dimension} ${
        isDark
          ? 'drop-shadow-[0_14px_30px_rgba(0,0,0,0.65)]'
          : 'drop-shadow-[0_8px_22px_rgba(158,123,59,0.22)]'
      }`}
    >
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="aristocratGoldL"
            x1="0"
            y1="0"
            x2="120"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f6ead0" />
            <stop offset="30%" stopColor="#dfc282" />
            <stop offset="65%" stopColor="#a6813e" />
            <stop offset="100%" stopColor="#63491c" />
          </linearGradient>
          <linearGradient
            id="aristocratGoldR"
            x1="240"
            y1="0"
            x2="120"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f6ead0" />
            <stop offset="30%" stopColor="#dfc282" />
            <stop offset="65%" stopColor="#a6813e" />
            <stop offset="100%" stopColor="#63491c" />
          </linearGradient>
          <radialGradient
            id="aristocratMedallionDark"
            cx="120"
            cy="116"
            r="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#262018" stopOpacity="0.98" />
            <stop offset="75%" stopColor="#17130e" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#110e0a" stopOpacity="0.88" />
          </radialGradient>
          <radialGradient
            id="aristocratMedallionLight"
            cx="120"
            cy="116"
            r="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="75%" stopColor="#faf5ea" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#efe3ca" stopOpacity="0.7" />
          </radialGradient>
          <g id="aristocratWing">
            <path
              d="M120,46 C104,22 65,20 44,43 C23,66 26,99 44,126 C64,156 100,184 120,204 C110,186 81,163 65,137 C52,115 48,90 59,69 C71,48 100,46 120,61 Z"
              fill="url(#aristocratGoldL)"
            />
            <path
              d="M44,43 C29,28 46,13 65,19 C52,26 53,38 59,41 C46,40 44,47 44,43 Z"
              fill="url(#aristocratGoldL)"
            />
            <path
              d="M28,78 C13,65 26,46 42,54 C30,61 32,74 44,76 C30,76 28,82 28,78 Z"
              fill="url(#aristocratGoldL)"
            />
            <path
              d="M36,118 C21,105 34,88 53,95 C40,101 42,114 55,116 C40,118 36,124 36,118 Z"
              fill="url(#aristocratGoldL)"
            />
            <path
              d="M61,158 C42,146 59,128 78,136 C65,143 67,154 80,156 C65,158 59,164 61,158 Z"
              fill="url(#aristocratGoldL)"
            />
          </g>
        </defs>

        <circle
          cx="120"
          cy="120"
          r="112"
          stroke="#c5a467"
          strokeWidth="0.75"
          strokeDasharray="2.5, 4"
          opacity="0.55"
        />
        <circle
          cx="120"
          cy="120"
          r="105"
          stroke="#c5a467"
          strokeWidth="0.5"
          opacity="0.3"
        />

        <circle cx="120" cy="8" r="2.6" fill="#dfc282" />
        <circle cx="120" cy="232" r="2.6" fill="#dfc282" />
        <circle cx="8" cy="120" r="2.6" fill="#dfc282" />
        <circle cx="232" cy="120" r="2.6" fill="#dfc282" />

        <path
          d="M120,50 C104,24 54,24 38,57 C22,90 52,139 120,194 C188,139 218,90 202,57 C186,24 136,24 120,50 Z"
          fill={isDark ? 'url(#aristocratMedallionDark)' : 'url(#aristocratMedallionLight)'}
        />

        <use href="#aristocratWing" />
        <g transform="translate(240, 0) scale(-1, 1)">
          <use href="#aristocratWing" fill="url(#aristocratGoldR)" />
        </g>

        <path
          d="M120,22 C124.5,31 128.5,35 120,44 C111.5,35 115.5,31 120,22 Z"
          fill="#dfc282"
          stroke="#755723"
          strokeWidth="0.8"
        />
        <path
          d="M120,200 C115.5,211 111.5,215 120,224 C128.5,215 124.5,211 120,200 Z"
          fill="#dfc282"
          stroke="#755723"
          strokeWidth="0.8"
        />
      </svg>

      {/* Couple Monogram Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <div
          className={`flex items-center gap-2 font-moul text-lg sm:text-xl ${
            isDark ? 'text-[#f3e3bd]' : 'text-[#5b4319]'
          }`}
        >
          <span>{groomInitial}</span>
          <span className="text-xs font-editorial italic text-[#b8934a]">&amp;</span>
          <span>{brideInitial}</span>
        </div>
      </div>
    </div>
  );
}
