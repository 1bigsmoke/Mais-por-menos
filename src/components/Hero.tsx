import { IMG } from "../assets";
import { ArrowRight, Shield, Sparkle, Tag, Truck, Wallet } from "./icons";
import { PriceTag } from "./primitives";

function RotatingBadge() {
  return (
    <div className="pointer-events-none absolute -bottom-8 -left-6 h-32 w-32 sm:-left-10 sm:h-40 sm:w-40">
      <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
        <defs>
          <path
            id="hero-badge-path"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
            fill="none"
          />
        </defs>
        <circle cx="100" cy="100" r="92" fill="#FFD227" stroke="#1B0733" strokeWidth="3" />
        <text
          fill="#1B0733"
          style={{ fontFamily: "Anton, sans-serif", fontSize: 17, letterSpacing: "0.06em" }}
        >
          <textPath href="#hero-badge-path">
            PEQUENOS PREÇOS ★ GRANDES DESCOBERTAS ★
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-[42%] w-[42%] items-center justify-center rounded-full border-2 border-ink bg-magenta">
          <Sparkle className="h-6 w-6 text-cream" />
        </div>
      </div>
    </div>
  );
}

const TRUST = [
  { icon: Truck, title: "Frete grátis", sub: "acima de R$ 60,00" },
  { icon: Wallet, title: "Parcele 3x", sub: "sem juros no cartão" },
  { icon: Shield, title: "Compra segura", sub: "site demonstrativo" },
  { icon: Tag, title: "A partir de R$ 1,00", sub: "achadinhos todo dia" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative">
      <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <div className="lg:col-span-7">
            <span className="label inline-flex items-center gap-2 -rotate-[1.5deg] border-2 border-ink bg-cream px-4 py-2 text-ink shadow-[5px_5px_0_#FF2D78]">
              <span className="h-2 w-2 rounded-full bg-magenta" />
              Loja de utilidades · Mais de 2.500 itens
            </span>

            <h1 className="display mt-6 text-[clamp(2.7rem,8vw,6.1rem)] text-cream">
              Sua casa completa.
              <br />
              <span className="text-sun" style={{ textShadow: "6px 6px 0 #FF2D78" }}>
                Seu bolso feliz!
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-cream/90 sm:text-[1.15rem]">
              Milhares de utilidades para facilitar sua rotina. Encontre tudo o
              que você precisa sem gastar muito — de limpeza e cozinha a
              organização e decoração, com a{" "}
              <strong className="font-bold text-sun">qualidade da Mais por Menos</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#produtos"
                className="btn-press group inline-flex items-center gap-3 border-2 border-ink bg-magenta px-7 py-4 text-base font-bold uppercase tracking-[0.12em] text-white shadow-[7px_7px_0_#1B0733] hover:bg-tangerine"
              >
                Comprar agora
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#ofertas"
                className="btn-press inline-flex items-center gap-2 border-2 border-cream/70 px-7 py-4 text-base font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-sun hover:text-sun"
              >
                Ver ofertas
              </a>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-sun">
              <Sparkle className="h-5 w-5" />
              Pequenos preços, grandes descobertas!
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 border-2 border-white/15 bg-white/10 px-3.5 py-3"
                >
                  <Icon className="h-6 w-6 shrink-0 text-sun" />
                  <div className="min-w-0">
                    <p className="truncate text-[0.82rem] font-bold text-cream">{title}</p>
                    <p className="truncate text-[0.72rem] text-cream/70">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* image */}
          <div className="relative lg:col-span-5">
            <div className="paper grain relative -rotate-[2.2deg] p-3">
              <div className="img-zoom relative overflow-hidden">
                <img
                  src={IMG.hero}
                  alt="Utilidades domésticas coloridas da Mais por Menos"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,45,120,0.12), rgba(255,122,24,0.16))",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>

              <div className="absolute left-4 top-6 sm:left-6">
                <span className="tag display inline-block -rotate-[8deg] px-3 py-1.5 text-[1.05rem] text-ink">
                  Tudo por até R$ 30
                </span>
              </div>

              <div className="absolute bottom-6 right-4 sm:right-6">
                <span className="tag display inline-block rotate-[6deg] border-magenta bg-magenta px-3 py-1.5 text-[1.05rem] text-white">
                  Até 40% OFF
                </span>
              </div>
            </div>

            <div className="absolute -right-1 -top-7 sm:-right-3">
              <PriceTag value={1} size="md" className="rotate-[7deg]" />
            </div>

            <RotatingBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
