import { IMG } from "../assets";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { useShop } from "../store";
import { SectionTitle } from "./primitives";

export default function Categories() {
  const { setActiveCategory } = useShop();

  const pick = (id: string) => {
    setActiveCategory(id);
    document
      .getElementById("produtos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="categorias" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <SectionTitle
          eyebrow="Escolha por setor"
          title="Categorias que"
          accent="cabem no bolso"
          description="Dez setores completos para você encontrar rápido o que a sua casa precisa — e ainda descobrir o que nem sabia que queria."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => {
            const total = PRODUCTS.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => pick(cat.id)}
                className="reveal paper card-lift group overflow-hidden text-left"
                style={{ transitionDelay: `${Math.min(i, 9) * 45}ms` }}
              >
                <div className="img-zoom relative overflow-hidden border-b-2 border-ink">
                  <img
                    src={IMG[cat.img]}
                    alt={cat.name}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover"
                    style={{ objectPosition: cat.pos }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-35 transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: cat.color, mixBlendMode: "color" }}
                  />
                  <span
                    className="label absolute bottom-2 left-2 border-2 border-ink px-2 py-1 text-[0.55rem] text-ink"
                    style={{ background: cat.color }}
                  >
                    {total} itens
                  </span>
                </div>
                <div className="px-3.5 py-3">
                  <h3 className="display text-[1.05rem] leading-tight text-ink">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-[0.72rem] leading-snug text-ink/65">
                    {cat.blurb}
                  </p>
                  <span className="label mt-2.5 inline-flex items-center gap-1 text-[0.55rem] text-magenta-dark">
                    Ver produtos
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
