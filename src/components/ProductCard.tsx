import { useShop } from "../store";
import { brl, categoryById, type Product } from "../data/products";
import { IMG } from "../assets";
import { Heart, Plus, Star } from "./icons";

const BADGE_STYLE: Record<string, string> = {
  Oferta: "bg-magenta text-white",
  "Mais vendido": "bg-sun text-ink",
  Novidade: "bg-sky text-white",
  Achadinho: "bg-tangerine text-white",
};

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const cat = categoryById(product.category);
  const fav = isFavorite(product.id);

  return (
    <article
      className="reveal paper card-lift group flex h-full flex-col"
      style={{ transitionDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <div className="img-zoom relative overflow-hidden border-b-2 border-ink">
        <img
          src={IMG[product.img]}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
          style={{ objectPosition: product.pos }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: product.tint, mixBlendMode: "color" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{
            background:
              "linear-gradient(to top, rgba(27,7,51,0.35), rgba(27,7,51,0))",
          }}
        />

        {product.badge && (
          <span
            className={`label absolute left-2 top-2 -rotate-[3deg] border-2 border-ink px-2.5 py-1 text-[0.58rem] shadow-[3px_3px_0_#1B0733] ${
              BADGE_STYLE[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={fav}
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink transition-all ${
            fav
              ? "bg-magenta text-white"
              : "bg-cream/90 text-ink hover:bg-magenta hover:text-white"
          }`}
        >
          <Heart className="h-4 w-4" filled={fav} />
        </button>

        <span className="label absolute bottom-2 left-2 bg-ink/80 px-2 py-1 text-[0.55rem] text-cream">
          {cat.short}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[0.95rem] font-bold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[0.75rem] leading-relaxed text-ink/65">
          {product.desc}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex text-tangerine">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star
                key={s}
                className="h-3.5 w-3.5"
                filled={s < Math.round(product.rating)}
              />
            ))}
          </span>
          <span className="tnum text-[0.7rem] font-semibold text-ink/60">
            {product.rating.toFixed(1).replace(".", ",")} ({product.reviews})
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            {product.oldPrice && (
              <p className="tnum text-[0.72rem] font-semibold text-ink/50 line-through">
                {brl(product.oldPrice)}
              </p>
            )}
            <p className="display tnum text-[1.9rem] leading-none text-ink">
              <span className="mr-1 align-super text-[0.42em] font-sans font-bold">
                R$
              </span>
              {product.price.toFixed(2).replace(".", ",")}
            </p>
          </div>
          {product.oldPrice && (
            <span className="label -rotate-[4deg] border-2 border-ink bg-tangerine px-2 py-1 text-[0.55rem] text-white">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="btn-press mt-3.5 flex w-full items-center justify-center gap-2 border-2 border-ink bg-ink px-2 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-cream shadow-[4px_4px_0_#FF2D78] hover:bg-magenta hover:text-white sm:px-3 sm:text-[0.75rem] sm:tracking-[0.12em]"
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">
            Adicionar<span className="hidden sm:inline"> ao carrinho</span>
          </span>
        </button>
      </div>
    </article>
  );
}
