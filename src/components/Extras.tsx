import { useRef, useState } from "react";
import { IMG } from "../assets";
import {
  BEST_SELLERS,
  PRODUCTS,
  WEEK_FINDS,
  brl,
  categoryById,
} from "../data/products";
import { useShop } from "../store";
import ProductCard from "./ProductCard";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Sparkle,
  Tag,
  ThumbsUp,
  Truck,
  Wallet,
} from "./icons";
import { PriceTag, SectionTitle } from "./primitives";

/* ---------------- Mais vendidos (rail) ---------------- */
export function BestSellers() {
  const rail = useRef<HTMLDivElement>(null);
  const items = BEST_SELLERS.map((id) => PRODUCTS.find((p) => p.id === id)!);

  const scroll = (dir: number) => {
    rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="mais-vendidos" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <SectionTitle
          eyebrow="Favoritos dos clientes"
          title="Mais vendidos"
          accent="da semana"
          description="Os campeões de venda da loja — aqueles que somem do estoque primeiro."
          actionLabel="Ver vitrine completa"
          onAction={() =>
            document
              .getElementById("produtos")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <div className="relative mt-9">
          <div className="absolute -top-14 right-0 hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-cream text-ink shadow-[4px_4px_0_#1B0733] transition-colors hover:bg-sun"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Próximo"
              className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-cream text-ink shadow-[4px_4px_0_#1B0733] transition-colors hover:bg-sun"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            ref={rail}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          >
            {items.map((p, i) => (
              <div
                key={p.id}
                className="w-[248px] shrink-0 snap-start sm:w-[268px]"
              >
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achadinhos da semana ---------------- */
export function WeekFinds() {
  const { addToCart, setCartOpen } = useShop();
  const items = WEEK_FINDS.map((id) => PRODUCTS.find((p) => p.id === id)!);

  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="reveal grid overflow-hidden border-2 border-ink bg-cream shadow-[12px_12px_0_rgba(27,7,51,0.35)] lg:grid-cols-12">
          <div className="relative min-h-[320px] lg:col-span-5">
            <img
              src={IMG.achadinhos}
              alt="Achadinhos baratos da semana"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,246,236,0.05), rgba(255,45,120,0.35))",
              }}
            />
            <div className="absolute left-6 top-6">
              <span className="tag display inline-block -rotate-[4deg] px-3.5 py-2 text-[1.15rem] text-ink">
                Toda quinta tem novidade
              </span>
            </div>
          </div>

          <div className="p-7 sm:p-9 lg:col-span-7">
            <span className="label inline-block -rotate-[1.5deg] border-2 border-ink bg-magenta px-3 py-1 text-[0.58rem] text-white">
              Achadinhos da semana
            </span>
            <h2 className="display mt-4 text-[clamp(2.1rem,4.6vw,3.2rem)] text-ink">
              Pequenos preços,
              <br />
              <span className="text-magenta-dark">grandes descobertas!</span>
            </h2>
            <p className="mt-3 max-w-lg text-ink/75">
              Sete itens escolhidos na mão pelo time de compras da Mais por Menos —
              os mais baratos, mais úteis e mais queridos do estoque.
            </p>

            <ul className="mt-6 divide-y-2 divide-ink/10">
              {items.map((p, i) => (
                <li
                  key={p.id}
                  className="flex items-center gap-4 py-3 transition-colors hover:bg-sun/25"
                >
                  <span className="display tnum w-8 shrink-0 text-[1.35rem] text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={IMG[p.img]}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 shrink-0 border-2 border-ink object-cover"
                    style={{ objectPosition: p.pos }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.92rem] font-bold text-ink">
                      {p.name}
                    </p>
                    <p className="text-[0.75rem] text-ink/60">
                      {categoryById(p.category).short} · avaliação{" "}
                      {p.rating.toFixed(1).replace(".", ",")}
                    </p>
                  </div>
                  <PriceTag value={p.price} size="sm" className="shrink-0" />
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(p);
                      setCartOpen(true);
                    }}
                    aria-label={`Adicionar ${p.name} ao carrinho`}
                    className="btn-press flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-ink text-cream shadow-[3px_3px_0_#FF2D78] hover:bg-magenta"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Por que comprar ---------------- */
const REASONS = [
  {
    n: "01",
    title: "Preços acessíveis",
    text: "Itens a partir de R$ 1,00 e promoções frequentes para cuidar do seu bolso.",
    icon: Tag,
    color: "#FFD227",
  },
  {
    n: "02",
    title: "Variedade de produtos",
    text: "Dez setores e mais de 2.500 itens entre limpeza, cozinha, banheiro e decoração.",
    icon: Sparkle,
    color: "#FF2D78",
  },
  {
    n: "03",
    title: "Praticidade no dia a dia",
    text: "Produtos simples, resistentes e pensados para resolver a rotina da casa.",
    icon: ThumbsUp,
    color: "#1F7BF6",
  },
  {
    n: "04",
    title: "Compra simples e intuitiva",
    text: "Busca, filtros e carrinho que funcionam de verdade, em qualquer aparelho.",
    icon: Wallet,
    color: "#FF7A18",
  },
];

export function WhyUs() {
  return (
    <section id="sobre" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <SectionTitle
          eyebrow="Sobre a Mais por Menos"
          title="Por que comprar"
          accent="na Mais por Menos?"
          description="Somos a loja do achadinho: economia, variedade e praticidade em um só lugar, com uma vitrine que renova toda semana."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, ...r }, i) => (
            <div
              key={r.n}
              className="reveal paper card-lift flex flex-col p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center border-2 border-ink"
                style={{ background: r.color }}
              >
                <Icon className="h-7 w-7 text-ink" />
              </div>
              <p className="display mt-5 text-[2.4rem] leading-none text-ink/25">
                {r.n}
              </p>
              <h3 className="display mt-2 text-[1.25rem] leading-tight text-ink">
                {r.title}
              </h3>
              <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink/70">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-2 border-ink bg-ink px-8 py-6">
          {[
            { icon: Truck, t: "Envio para todo o Brasil" },
            { icon: Check, t: "Troca fácil em até 7 dias" },
            { icon: Heart, t: "Atendimento que resolve" },
            { icon: Tag, t: "Preço baixo todo dia" },
          ].map(({ icon: Icon, t }) => (
            <span
              key={t}
              className="flex items-center gap-2.5 text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-cream"
            >
              <Icon className="h-5 w-5 text-sun" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Depoimentos ---------------- */
const TESTIMONIALS = [
  {
    name: "Mariana S.",
    city: "Campinas — SP",
    text: "Comprei organizadores, panos e umas esponhas e a casa inteira ficou com cara de nova. O preço é o grande destaque.",
    color: "#FF2D78",
    stars: 5,
  },
  {
    name: "Rafael A.",
    city: "Salvador — BA",
    text: "Achei tudo o que precisava para a cozinha em um lugar só. O carrinho é fácil de usar e a entrega foi rápida.",
    color: "#1F7BF6",
    stars: 5,
  },
  {
    name: "Juliana P.",
    city: "Curitiba — PR",
    text: "Virou minha loja favorita para presentear e renovar a casa sem pesar no bolso. A variedade surpreende.",
    color: "#FF7A18",
    stars: 4,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <SectionTitle
          eyebrow="Depoimentos demonstrativos"
          title="Quem compra,"
          accent="conta assim"
          description="Os relatos abaixo são exemplos criados para esta apresentação escolar e não representam opiniões reais de clientes."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="reveal paper card-lift flex flex-col p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center border-2 border-ink font-display text-[1.15rem] text-cream"
                style={{ background: t.color }}
              >
                {t.name.charAt(0)}
              </div>
              <div className="mt-4 flex text-tangerine">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className={s < t.stars ? "" : "opacity-30"}>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/80">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 border-t-2 border-ink/10 pt-4">
                <p className="text-[0.92rem] font-bold text-ink">{t.name}</p>
                <p className="text-[0.75rem] text-ink/60">{t.city}</p>
                <p className="label mt-2 text-[0.5rem] text-magenta-dark">
                  Exemplo demonstrativo
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */
export function Newsletter() {
  const { notify } = useShop();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError("Digite um e-mail válido para receber as novidades.");
      return;
    }
    setError("");
    setSent(true);
    notify("E-mail cadastrado! Você receberá as novidades da Mais por Menos.", "add");
    setEmail("");
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div
          className="reveal shine grid items-center gap-8 border-2 border-ink px-7 py-10 shadow-[12px_12px_0_rgba(27,7,51,0.4)] sm:px-10 lg:grid-cols-2"
          style={{
            background:
              "linear-gradient(120deg, #FFD227 0%, #FF7A18 45%, #FF2D78 100%)",
          }}
        >
          <div>
            <span className="label inline-block -rotate-[2deg] border-2 border-ink bg-ink px-3 py-1 text-[0.58rem] text-cream">
              Newsletter
            </span>
            <h2 className="display mt-4 text-[clamp(2.1rem,5vw,3.4rem)] leading-[0.94] text-ink">
              Receba os achadinhos antes de todo mundo
            </h2>
            <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-ink/80">
              Cadastre seu e-mail e fique por dentro das promoções, novidades e
              da LOUCURA DE PREÇOS. Cadastro apenas demonstrativo: nada é enviado
              para serviços externos.
            </p>
          </div>

          <form onSubmit={submit} noValidate>
            <label
              htmlFor="newsletter-email"
              className="label block text-[0.58rem] text-ink/80"
            >
              Seu melhor e-mail
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com.br"
                className="w-full border-2 border-ink bg-cream px-4 py-4 text-[0.95rem] text-ink placeholder:text-ink/45 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-press flex shrink-0 items-center justify-center gap-2 border-2 border-ink bg-ink px-7 py-4 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-cream shadow-[5px_5px_0_#FFF6EC] hover:bg-magenta"
              >
                <Mail className="h-4.5 w-4.5" />
                Quero receber
              </button>
            </div>

            {error && (
              <p className="mt-3 border-2 border-ink bg-cream px-3 py-2 text-[0.8rem] font-semibold text-magenta-dark">
                {error}
              </p>
            )}
            {sent && !error && (
              <p className="pop-in mt-3 flex items-center gap-2 border-2 border-ink bg-cream px-3 py-2 text-[0.82rem] font-semibold text-ink">
                <Check className="h-4 w-4 text-magenta-dark" />
                Pronto! Seu e-mail foi registrado localmente para esta
                demonstração.
              </p>
            )}

            <p className="mt-4 text-[0.72rem] leading-relaxed text-ink/70">
              Projeto escolar demonstrativo. Não coletamos, armazenamos nem
              enviamos dados para nenhum serviço externo.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export { brl };
