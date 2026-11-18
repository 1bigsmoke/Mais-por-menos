type IconProps = { className?: string; strokeWidth?: number };

const base = (className = "h-5 w-5") => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const Search = ({ className, strokeWidth }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth ?? 2}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const User = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
  </svg>
);

export const Heart = ({ className, filled }: IconProps & { filled?: boolean }) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.5 3.8 12.4a5 5 0 0 1 7-7.1l1.2 1.2 1.2-1.2a5 5 0 0 1 7 7.1Z" />
  </svg>
);

export const Cart = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M3 4h2.2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 8H6" />
    <circle cx="10" cy="20" r="1.4" />
    <circle cx="17" cy="20" r="1.4" />
  </svg>
);

export const Star = ({ className, filled }: IconProps & { filled?: boolean }) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"} strokeWidth={1.6}>
    <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6.1L12 16.9 6.7 19.7l1.1-6.1L3.4 9.4l6-.8Z" />
  </svg>
);

export const Plus = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 12h14" />
  </svg>
);

export const Trash = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export const Close = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Menu = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ChevronLeft = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="m14 6-6 6 6 6" />
  </svg>
);

export const ChevronRight = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="m10 6 6 6-6 6" />
  </svg>
);

export const Truck = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M2 7h11v10H2zM13 10h4l4 4v3h-8z" />
    <circle cx="7" cy="19" r="1.8" />
    <circle cx="17" cy="19" r="1.8" />
  </svg>
);

export const Shield = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 3 5 6v6c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Sparkle = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6.2 6.2l3.6 3.6M14.2 14.2l3.6 3.6M17.8 6.2l-3.6 3.6M9.8 14.2l-3.6 3.6" />
  </svg>
);

export const Tag = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M3 3h8l10 10-8 8L3 11Z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);

export const Mail = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 7 8.5-7" />
  </svg>
);

export const Phone = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M6 3h4l2 5-2.5 1.6a12 12 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </svg>
);

export const Pin = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Clock = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Refresh = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v5h-5" />
  </svg>
);

export const Instagram = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Facebook = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H9v3.5h2V22h3.5v-7.5H17l.6-3.5h-3.1V9a.5.5 0 0 1 .5-.5Z" />
  </svg>
);

export const Youtube = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="2.5" y="6" width="19" height="12" rx="4" />
    <path d="m10.5 9.5 5 2.5-5 2.5Z" />
  </svg>
);

export const TikTok = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46" />
    <path d="M14 3c.6 2.6 2.2 4 4.8 4.2" />
  </svg>
);

export const Wallet = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="3" y="6" width="18" height="13" rx="3" />
    <path d="M3 10h18M16 14.5h2" />
  </svg>
);

export const ThumbsUp = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M7 21V10l4-7 1.2.7a2 2 0 0 1 1 2.3L12.5 9H19a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.8 20H7Z" />
    <path d="M7 10H4v11h3" />
  </svg>
);

export const Layers = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="m12 3 9 5-9 5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);
