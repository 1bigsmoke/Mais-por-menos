import { IMG } from "../assets";
import {
  TiltedGridHero,
  type TiltedGridImage,
} from "./ui/tilted-grid-hero";
import { ArrowRight, Sparkle, Tag, Truck } from "./icons";

/* ═══════════════════════════════════════════════════════════════
 *  AJUSTES RÁPIDOS — tudo que dá pra mudar sem caçar código.
 *  Textos, imagens, velocidade e curvatura da faixa ficam aqui.
 * ═══════════════════════════════════════════════════════════════ */

/** Movimento da faixa (todas em % da altura do bloco, exceto speed/curve). */
export const BAND_TUNING = {
  speed: 4.5, // segundos por tile — menor = mais rápido
  tileHeight: 24, // altura de cada tile (% da altura do bloco)
  gap: 7, // espaço entre tiles (% da altura de um tile)
  axis: 56, // onde a fila passa na vertical (% do topo)
  curve: 82, // curvatura nas pontas (graus, 5–85)
  fade: 13, // largura do fade nas duas extremidades (%)
} as const;

/** Fotos que passam na faixa, na ordem. Basta trocar o `src`. */
const IMAGES: TiltedGridImage[] = [
  { src: IMG.hero, alt: "Utilidades domésticas coloridas da Mais por Menos" },
  { src: IMG.cozinha, alt: "Utensílios de cozinha coloridos" },
  { src: IMG.mesa, alt: "Pratos e copos reutilizáveis" },
  { src: IMG.limpeza, alt: "Produtos de limpeza para o dia a dia" },
  { src: IMG.panos, alt: "Panos de prato e toalhas" },
  { src: IMG.organizacao, alt: "Caixas, cestos e organizadores" },
  { src: IMG.casa, alt: "Itens de banheiro e decoração" },
  { src: IMG.papelaria, alt: "Papelaria e utilidades domésticas" },
  { src: IMG.promo, alt: "Cesta de utilidades em promoção" },
  { src: IMG.achadinhos, alt: "Achadinhos da semana a partir de R$ 1,00" },
];

/** Chamadas em cima da faixa. */
export const BAND_COPY = {
  eyebrow: "Vitrine em movimento",
  title: "Uma vitrine que",
  titleAccent: "nunca para de girar",
  text: "Mais de 2.500 utilidades para casa, limpeza, cozinha e organização passando na sua frente — com preço de loja de R$ 1,00 e acabamento que surpreende.",
  primaryCta: { label: "Ver todos os produtos", href: "#produtos" },
  secondaryCta: { label: "Ver ofertas", href: "#ofertas" },
} as const;

/** Selo em amarelo no meio (ícones: Tag, Truck, Sparkle, Wallet…). */
const STATS: {
  icon: typeof Tag;
  t: string;
  highlight?: boolean;
}[] = [
  { icon: Tag, t: "A partir de R$ 1,00" },
  { icon: Truck, t: "Frete grátis acima de R$ 60", highlight: true },
  { icon: Sparkle, t: "Novidades toda semana" },
];

/**
 * Mais por Menos's curved, always-moving product band.
 *
 * `TiltedGridHero` streams one row of photography around the inside of a
 * cylinder: the centre tiles face you flat, the ends curl toward the lens
 * and fade into the page. Here it carries the store's own product shots,
 * so the band doubles as a vitrine that never stops running.
 */
export default function TiltedBand() {
  const { eyebrow, title, titleAccent, text, primaryCta, secondaryCta } =
    BAND_COPY;

  return (
    <section className="relative border-y-2 border-ink">
      <TiltedGridHero
        images={IMAGES}
        speed={BAND_TUNING.speed}
        tileHeight={BAND_TUNING.tileHeight}
        gap={BAND_TUNING.gap}
        axis={BAND_TUNING.axis}
        curve={BAND_TUNING.curve}
        fade={BAND_TUNING.fade}
        className="h-[460px] w-full bg-grape sm:h-[540px] lg:h-[620px]"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-5 py-8 text-center sm:px-10 sm:py-11">
          {/* scrim: keeps the type legible over any tile behind it */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(118% 78% at 50% 50%, rgba(23,4,52,0.9) 0%, rgba(23,4,52,0.66) 42%, rgba(23,4,52,0.16) 80%)",
            }}
          />

          <span className="label relative -rotate-[1.5deg] border-2 border-ink bg-cream px-3.5 py-1.5 text-ink shadow-[4px_4px_0_#FF2D78]">
            {eyebrow}
          </span>

          <div className="relative flex max-w-3xl flex-col items-center">
            <h2 className="display text-[clamp(2.15rem,6.4vw,4.6rem)] leading-[0.9] text-cream">
              {title}
              <br />
              <span
                className="text-sun"
                style={{ textShadow: "5px 5px 0 #FF2D78" }}
              >
                {titleAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cream/90 sm:text-[1.06rem]">
              {text}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={primaryCta.href}
                className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-magenta px-6 py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white shadow-[5px_5px_0_#1B0733] hover:bg-tangerine"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={secondaryCta.href}
                className="btn-press inline-flex items-center gap-2 border-2 border-cream/70 px-6 py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:border-sun hover:text-sun"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-2.5">
            {STATS.map(({ icon: Icon, t, highlight }) => (
              <span
                key={t}
                className={`flex items-center gap-2 border-2 border-ink px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_rgba(27,7,51,0.5)] ${
                  highlight ? "bg-sun" : "bg-cream"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </TiltedGridHero>
    </section>
  );
}
