import { useEffect, useState } from "react";
import { IMG } from "../assets";
import { useShop } from "../store";
import { ArrowRight, Clock, Sparkle, Tag, ThumbsUp, Wallet } from "./icons";
import { Marquee } from "./primitives";

/* ---------- diagonal full-bleed marquee band ---------- */
export function MarqueeBand({
  items,
  bg = "#FF2D78",
  color = "#FFF6EC",
  rotate = -2,
}: {
  items: string[];
  bg?: string;
  color?: string;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden
      className="relative z-10 w-[112vw] overflow-hidden border-y-2 border-ink py-4"
      style={{
        background: bg,
        transform: `translateX(-6vw) rotate(${rotate}deg)`,
      }}
    >
      <Marquee
        items={items.map((t) => (
          <span
            className="display flex items-center gap-6 px-6 text-[1.65rem] leading-none sm:text-[2.15rem]"
            style={{ color }}
          >
            {t}
            <Sparkle className="h-6 w-6 shrink-0" />
          </span>
        ))}
        itemClassName="flex"
      />
    </div>
  );
}

/* ---------- countdown ---------- */
function useCountdown() {
  const [left, setLeft] = useState(() => getTimeLeft());
  useEffect(() => {
    const id = window.setInterval(() => setLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return left;
}

function getTimeLeft() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

const CALLOUTS = [
  {
    title: "Achadinhos a partir de R$ 1,00!",
    text: "Esponjas, panos, copos e muito mais com preço que você não acredita.",
    color: "#FFD227",
    ink: "#1B0733",
    icon: Tag,
  },
  {
    title: "Sua cozinha merece essa economia!",
    text: "Utensílios resistentes e coloridos para renovar a rotina do preparo.",
    color: "#FF2D78",
    ink: "#FFF6EC",
    icon: ThumbsUp,
  },
  {
    title: "Ofertas que cabem no seu bolso!",
    text: "Combos e kits com desconto real para comprar mais gastando menos.",
    color: "#1F7BF6",
    ink: "#FFF6EC",
    icon: Wallet,
  },
  {
    title: "Renove sua casa gastando pouco!",
    text: "Decoração, organização e banheiro com cara de nova por precinho.",
    color: "#FF7A18",
    ink: "#1B0733",
    icon: Sparkle,
  },
];

export default function Offers() {
  const { setActiveCategory, setQuery, notify } = useShop();
  const { h, m, s } = useCountdown();

  const seeAll = () => {
    setQuery("");
    setActiveCategory("ofertas");
    document
      .getElementById("produtos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    notify("Mostrando todas as ofertas da LOUCURA DE PREÇOS!", "info");
  };

  return (
    <section id="ofertas" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="reveal border-2 border-ink bg-cream shadow-[12px_12px_0_rgba(27,7,51,0.35)]">
          {/* header */}
          <div className="flex flex-col gap-6 border-b-2 border-ink bg-ink px-6 py-7 sm:px-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="label inline-block -rotate-[2deg] border-2 border-ink bg-sun px-3 py-1 text-[0.58rem] text-ink">
                Promoções da semana
              </span>
              <h2 className="display mt-3 text-[clamp(2.3rem,6vw,4.4rem)] text-sun">
                Loucura de preços
              </h2>
              <p className="mt-2 max-w-xl text-cream/85">
                Descontos demonstrativos para a apresentação, mas com a cara de
                verdade de um dia de liquidação na Mais por Menos.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex items-center gap-2 text-cream/85">
                <Clock className="h-5 w-5 text-sun" />
                <span className="label text-[0.58rem]">Oferta acaba em</span>
              </div>
              <div className="flex gap-2">
                {[
                  { v: pad(h), l: "horas" },
                  { v: pad(m), l: "min" },
                  { v: pad(s), l: "seg" },
                ].map((b) => (
                  <div
                    key={b.l}
                    className="min-w-[64px] border-2 border-ink bg-magenta px-3 py-2 text-center shadow-[4px_4px_0_#FFD227]"
                  >
                    <p className="display tnum text-[1.9rem] leading-none text-white">
                      {b.v}
                    </p>
                    <p className="label mt-1 text-[0.5rem] text-white/80">{b.l}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={seeAll}
                className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-sun px-6 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink shadow-[5px_5px_0_#FF2D78] hover:bg-tangerine"
              >
                Ver todas as ofertas
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* body */}
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-[380px] overflow-hidden border-b-2 border-ink lg:border-b-0 lg:border-r-2">
              <img
                src={IMG.promo}
                alt="Cesta de utilidades domésticas em promoção"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(27,7,51,0.15) 0%, rgba(38,6,79,0.86) 100%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-end p-7 sm:p-9">
                <span className="label w-fit -rotate-[2deg] border-2 border-ink bg-sun px-3 py-1 text-[0.58rem] text-ink">
                  Achadinhos da semana
                </span>
                <p className="display mt-4 text-[clamp(2.1rem,4.4vw,3.3rem)] leading-[0.92] text-cream">
                  Achadinhos a partir de{" "}
                  <span className="text-sun">R$ 1,00!</span>
                </p>
                <p className="mt-3 max-w-md text-cream/85">
                  Seleção renovada toda semana com utilidades que resolvem o dia
                  a dia e sobra dinheiro para o resto.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["R$ 1,00", "R$ 2,00", "R$ 5,00", "R$ 9,90"].map((p, i) => (
                    <span
                      key={p}
                      className={`tag display px-3.5 py-2 text-[1.15rem] text-ink ${
                        i % 2 ? "rotate-[3deg]" : "-rotate-[3deg]"
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {CALLOUTS.map(({ icon: Icon, ...c }) => (
                <div
                  key={c.title}
                  className="flex flex-col justify-between border-b-2 border-ink p-6 last:border-b-0 sm:border-r-2 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(3)]:border-b-0"
                  style={{ background: c.color, color: c.ink }}
                >
                  <Icon className="h-8 w-8" />
                  <h3 className="display mt-6 text-[1.35rem] leading-[1.02]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed opacity-85">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
