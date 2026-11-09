interface ProTickLogoProps {
  className?: string;
  size?: number;
}

export function ProTickLogo({ className = "w-10 h-10", size }: ProTickLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="ProTick Logo"
    >
      <defs>
        <linearGradient id="comp-protick-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1E3B" />
          <stop offset="50%" stopColor="#123B70" />
          <stop offset="100%" stopColor="#1E56A0" />
        </linearGradient>
        <linearGradient id="comp-protick-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="comp-protick-check" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="comp-protick-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Squircle Base with shadow */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="22"
        fill="url(#comp-protick-bg)"
        filter="url(#comp-protick-shadow)"
      />

      {/* Subtle border outline */}
      <rect
        x="6.75"
        y="6.75"
        width="86.5"
        height="86.5"
        rx="21.25"
        fill="none"
        stroke="url(#comp-protick-border)"
        strokeWidth="1.5"
      />

      {/* Subtle radar / grid elements */}
      <circle cx="50" cy="50" r="30" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="20" stroke="#FFFFFF" strokeOpacity="0.05" strokeWidth="1" />

      {/* Checkmark Mark */}
      <path
        d="M28 52 L43 67 L74 34"
        stroke="url(#comp-protick-check)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secure Terminal Status Indicator */}
      <circle cx="76" cy="24" r="3.5" fill="#34D399" />
      <circle cx="76" cy="24" r="6" stroke="#34D399" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
}

export default ProTickLogo;
