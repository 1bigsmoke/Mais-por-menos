import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, brl } from "../data/products";
import { useShop } from "../store";
import ProductCard from "./ProductCard";
import { Search, Sparkle, Tag } from "./icons";
import { SectionTitle } from "./primitives";

type Sort = "relevancia" | "menor" | "maior" | "avaliacao";

const SORTS: { id: Sort; label: string }[] = [
  { id: "relevancia", label: "Mais relevantes" },
  { id: "menor", label: "Menor preço" },
  { id: "maior", label: "Maior preço" },
  { id: "avaliacao", label: "Melhor avaliados" },
];

export default function Products() {
  const { query, setQuery, activeCategory, setActiveCategory, favorites } =
    useShop();
  const [sort, setSort] = useState<Sort>("relevancia");
  const [limit, setLimit] = useState(12);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const cat = CATEGORIES.find((c) => c.id === p.category)!;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "todos" ||
        (activeCategory === "favoritos"
          ? favorites.includes(p.id)
          : p.category === activeCategory);
      return matchesQuery && matchesCategory;
    });

    if (sort === "menor") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "maior") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "avaliacao")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, activeCategory, favorites, sort]);

  const visible = filtered.slice(0, limit);
  const showPromoTile = activeCategory === "todos" && !query.trim() && limit >= 12;

  return (
    <section id="produtos" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <SectionTitle
          eyebrow="Vitrine completa"
          title="Produtos com"
          accent="preço que você ama"
          description="Mais de 30 utilidades cadastradas, com avaliação, selo promocional e carrinho que funciona de verdade."
          onAction={() => {
            setActiveCategory("todos");
            setQuery("");
            setLimit(12);
          }}
          actionLabel="Limpar filtros"
        />

        {/* filter bar */}
        <div className="reveal mt-8 border-2 border-ink bg-cream p-4 shadow-[8px_8px_0_rgba(27,7,51,0.3)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 border-2 border-ink/25 bg-white px-3.5 py-2.5 focus-within:border-magenta">
              <Search className="h-4.5 w-4.5 shrink-0 text-magenta-dark" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(12);
                }}
                placeholder="Buscar por produto ou categoria (ex.: esponja, cozinha)"
                aria-label="Filtrar produtos"
                className="w-full bg-transparent text-[0.88rem] text-ink placeholder:text-ink/45 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="label text-[0.55rem] text-magenta-dark underline"
                >
                  limpar
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="label text-[0.55rem] text-ink/60">Ordenar</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Ordenar produtos"
                className="border-2 border-ink bg-white px-3 py-2.5 text-[0.82rem] font-semibold text-ink"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[{ id: "todos", name: "Todos" }, ...CATEGORIES].map((c) => {
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c.id);
                    setLimit(12);
                  }}
                  aria-pressed={active}
                  className={`btn-press border-2 border-ink px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] ${
                    active
                      ? "bg-ink text-cream shadow-[3px_3px_0_#FF2D78]"
                      : "bg-white text-ink hover:bg-sun"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setActiveCategory("favoritos");
                setLimit(12);
              }}
              aria-pressed={activeCategory === "favoritos"}
              className={`btn-press border-2 border-ink px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] ${
                activeCategory === "favoritos"
                  ? "bg-magenta text-white shadow-[3px_3px_0_#1B0733]"
                  : "bg-white text-ink hover:bg-magenta-light"
              }`}
            >
              ❤ Favoritos ({favorites.length})
            </button>
          </div>
        </div>

        {/* results */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.85rem] font-semibold text-cream/85">
            <strong className="tnum text-sun">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
            {query.trim() && (
              <>
                {" "}
                para <span className="text-sun">“{query.trim()}”</span>
              </>
            )}
          </p>
          <p className="flex items-center gap-2 text-[0.78rem] text-cream/70">
            <Tag className="h-4 w-4 text-sun" />
            Preços demonstrativos em reais (BRL)
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="reveal mt-8 border-2 border-dashed border-cream/40 bg-white/10 px-6 py-16 text-center">
            <Search className="mx-auto h-12 w-12 text-sun" />
            <h3 className="display mt-5 text-[1.75rem] text-cream">
              Nenhum produto por aqui
            </h3>
            <p className="mx-auto mt-2 max-w-md text-cream/80">
              Tente buscar por outro termo ou volte para a vitrine completa — a
              Mais por Menos tem mais de 2.500 itens esperando por você.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("todos");
              }}
              className="btn-press mt-6 border-2 border-ink bg-sun px-6 py-3 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-ink shadow-[5px_5px_0_#1B0733]"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {showPromoTile && (
                <div
                  className="reveal shine flex flex-col justify-between border-2 border-ink p-6 shadow-[8px_8px_0_rgba(27,7,51,0.35)]"
                  style={{
                    background:
                      "linear-gradient(150deg, #FFD227 0%, #FF7A18 60%, #FF2D78 100%)",
                  }}
                >
                  <div>
                    <span className="label inline-block -rotate-[3deg] border-2 border-ink bg-ink px-2.5 py-1 text-[0.55rem] text-cream">
                      Achadinho do dia
                    </span>
                    <p className="display mt-4 text-[2.4rem] leading-[0.92] text-ink">
                      A partir de
                      <br />
                      R$ 1,00
                    </p>
                    <p className="mt-3 text-[0.85rem] font-semibold leading-relaxed text-ink/80">
                      Variedade de verdade para casa inteira, com preço que
                      cabe no bolso e renova a rotina.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-ink">
                    <Sparkle className="h-5 w-5" />
                    Pequenos preços, grandes descobertas!
                  </div>
                </div>
              )}

              {visible.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            {filtered.length > limit && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + 8)}
                  className="btn-press border-2 border-ink bg-cream px-8 py-4 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-ink shadow-[6px_6px_0_#1B0733] hover:bg-sun"
                >
                  Carregar mais produtos
                </button>
                <p className="tnum text-[0.78rem] text-cream/70">
                  Exibindo {visible.length} de {filtered.length} · total da
                  seleção {brl(filtered.reduce((a, p) => a + p.price, 0))}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
