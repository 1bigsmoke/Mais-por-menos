import { useEffect, useRef, useState } from "react";
import { IMG } from "../assets";
import { useShop } from "../store";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";

type Slide = {
  img: string;
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  cta: string;
  category: string;
  bg: string;
  align: "left" | "right";
};

const SLIDES: Slide[] = [
  {
    img: IMG.cozinha,
    eyebrow: "Setor cozinha",
    title: "Sua cozinha merece",
    highlight: "essa economia!",
    text: "Utensílios resistentes, coloridos e leves que deixam o preparo muito mais prático — a partir de R$ 2,00.",
    cta: "Ver produtos de cozinha",
    category: "cozinha",
    bg: "linear-gradient(100deg, rgba(38,6,79,0.92) 0%, rgba(255,122,24,0.55) 65%, rgba(255,122,24,0.15) 100%)",
    align: "left",
  },
  {
    img: IMG.promo,
    eyebrow: "Loucura de preços",
    title: "Ofertas que cabem",
    highlight: "no seu bolso!",
    text: "Combos, kits e descontos de até 40% em produtos para a casa inteira. Corre que enquanto durar o estoque!",
    cta: "Ver todas as ofertas",
    category: "ofertas",
    bg: "linear-gradient(260deg, rgba(38,6,79,0.92) 0%, rgba(255,45,120,0.55) 65%, rgba(255,45,120,0.12) 100%)",
    align: "right",
  },
  {
    img: IMG.achadinhos,
    eyebrow: "Achadinhos da semana",
    title: "Renove sua casa",
    highlight: "gastando pouco!",
    text: "Organização, decoração e utilidades com preços que surpreendem. Pequenos preços, grandes descobertas!",
    cta: "Ver achadinhos",
    category: "organizacao",
    bg: "linear-gradient(100deg, rgba(38,6,79,0.92) 0%, rgba(255,210,39,0.5) 65%, rgba(255,210,39,0.12) 100%)",
    align: "left",
  },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { setActiveCategory, setQuery } = useShop();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      6500,
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused]);

  const go = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  const shop = (cat: string) => {
    setQuery("");
    setActiveCategory(cat);
    document
      .getElementById("produtos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pb-4">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div
          className="reveal relative overflow-hidden border-2 border-ink shadow-[12px_12px_0_rgba(27,7,51,0.35)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.title}
              aria-hidden={i !== index}
              className={`relative min-h-[340px] transition-opacity duration-700 ease-out sm:min-h-[380px] lg:min-h-[430px] ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              style={{
                position: i === index ? "relative" : "absolute",
                inset: 0,
              }}
            >
              <img
                src={s.img}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: s.bg }} />

              <div
                className={`relative flex h-full min-h-[340px] flex-col justify-center gap-3 px-6 py-10 sm:min-h-[380px] sm:px-10 lg:min-h-[430px] lg:px-14 ${
                  s.align === "right"
                    ? "ml-auto max-w-[640px] text-right items-end"
                    : "max-w-[640px]"
                }`}
              >
                <span className="label w-fit -rotate-[2deg] border-2 border-ink bg-sun px-3 py-1 text-[0.58rem] text-ink">
                  {s.eyebrow}
                </span>
                <h3 className="display text-[clamp(2rem,5.2vw,3.6rem)] leading-[0.94] text-cream">
                  {s.title}
                  <br />
                  <span className="text-sun">{s.highlight}</span>
                </h3>
                <p className="max-w-[470px] text-[0.95rem] leading-relaxed text-cream/90">
                  {s.text}
                </p>
                <button
                  type="button"
                  onClick={() => shop(s.category)}
                  className="btn-press mt-2 inline-flex w-fit items-center gap-2 border-2 border-ink bg-cream px-6 py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-ink shadow-[5px_5px_0_#1B0733] hover:bg-magenta hover:text-white"
                >
                  {s.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {/* arrows */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Banner anterior"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-ink bg-cream/85 text-ink transition-colors hover:bg-sun"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próximo banner"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-ink bg-cream/85 text-ink transition-colors hover:bg-sun"
          >
            <ChevronRight />
          </button>

          {/* dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para o banner ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 border-2 border-ink transition-all duration-300 ${
                  i === index ? "w-9 bg-sun" : "w-2.5 bg-cream/70 hover:bg-cream"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
