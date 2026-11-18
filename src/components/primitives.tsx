import { useEffect, type ReactNode } from "react";
import { brl } from "../data/products";

/* ---------------- Logo ---------------- */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="mpm-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD227" />
          <stop offset="55%" stopColor="#FF7A18" />
          <stop offset="100%" stopColor="#FF2D78" />
        </linearGradient>
      </defs>
      {/* selo em forma de etiqueta de preço */}
      <path
        d="M4 4h24.6a6 6 0 0 1 4.24 1.76l13.4 13.4a6 6 0 0 1 0 8.48L27.1 42.78a6 6 0 0 1-8.48 0L5.2 29.36A6 6 0 0 1 4 25.12Z"
        fill="url(#mpm-logo-grad)"
        stroke="#1B0733"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* "+" de MAIS */}
      <path
        d="M15.3 10.5h3.4v3.8h3.8v3.4h-3.8v3.8h-3.4v-3.8h-3.8v-3.4h3.8Z"
        fill="#1B0733"
      />
      {/* "−" de MENOS */}
      <path d="M22.5 28.3h13v3.4h-13Z" fill="#1B0733" />
    </svg>
  );
}

export function Logo({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark
        className={compact ? "h-9 w-9" : "h-9 w-9 sm:h-11 sm:w-11"}
      />
      <span className="leading-none">
        <span
          className={`display block whitespace-nowrap text-cream ${
            compact
              ? "text-[1.15rem]"
              : "text-[clamp(1.08rem,4.1vw,1.5rem)]"
          }`}
        >
          Mais por <span className="text-sun">Menos</span>
        </span>
        {!compact && (
          <span className="label mt-1 hidden text-[0.55rem] text-magenta-light sm:block">
            Utilidades &amp; economia
          </span>
        )}
      </span>
    </span>
  );
}

/* ---------------- Marquee ---------------- */
export function Marquee({
  items,
  reverse = false,
  fast = false,
  className = "",
  itemClassName = "",
}: {
  items: ReactNode[];
  reverse?: boolean;
  fast?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const track = (
    <div
      className={`marquee-track ${reverse ? "marquee-track-rev" : ""} ${
        fast ? "marquee-fast" : ""
      }`}
    >
      {items.map((item, i) => (
        <span key={i} className={itemClassName}>
          {item}
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`}>
      {track}
      {track}
    </div>
  );
}

/* ---------------- Reveal on scroll ---------------- */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = new Set<HTMLElement>();

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
            els.delete(e.target as HTMLElement);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-in)")
        .forEach((el) => {
          if (!els.has(el)) {
            els.add(el);
            io.observe(el);
          }
        });
    };

    scan();

    // produtos filtrados/adicionados dinamicamente também animam
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      els.clear();
    };
  }, []);
}

/* ---------------- Price tag ---------------- */
export function PriceTag({
  value,
  old,
  size = "md",
  className = "",
}: {
  value: number;
  old?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims =
    size === "lg"
      ? "px-4 py-2 text-[2.6rem]"
      : size === "sm"
        ? "px-2.5 py-1 text-[1.15rem]"
        : "px-3 py-1.5 text-[1.75rem]";
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span
        className={`tag tnum display -rotate-[3deg] leading-none text-ink ${dims}`}
      >
        <span className="mr-1 align-super text-[0.42em] font-sans font-bold">
          R$
        </span>
        {value.toFixed(2).replace(".", ",")}
      </span>
      {old && (
        <span className="mt-1 ml-1 text-[0.72rem] font-semibold text-ink/60 line-through tnum">
          {brl(old)}
        </span>
      )}
    </span>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionTitle({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  onAction,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  onAction?: () => void;
  actionLabel?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${
        align === "center" ? "text-center md:text-left" : ""
      }`}
    >
      <div className="max-w-2xl">
        <span className="label inline-block -rotate-[1.5deg] border-2 border-ink bg-sun px-3 py-1 text-ink">
          {eyebrow}
        </span>
        <h2 className="display mt-4 text-[clamp(2.1rem,5.4vw,3.9rem)] text-cream">
          {title}{" "}
          {accent && <span className="text-sun">{accent}</span>}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-cream/85">
            {description}
          </p>
        )}
      </div>
      {onAction && actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="btn-press inline-flex shrink-0 items-center gap-2 border-2 border-ink bg-cream px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_#1B0733] hover:bg-sun"
        >
          {actionLabel}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
