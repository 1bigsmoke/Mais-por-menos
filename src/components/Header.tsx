import { useEffect, useState } from "react";
import { useShop } from "../store";
import { Logo, Marquee } from "./primitives";
import {
  Cart,
  Heart,
  Menu,
  Search,
  Sparkle,
  Truck,
  User,
  Close,
} from "./icons";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Categorias", href: "#categorias" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Mais Vendidos", href: "#mais-vendidos" },
  { label: "Sobre Nós", href: "#sobre" },
];

export default function Header() {
  const {
    query,
    setQuery,
    count,
    favorites,
    setCartOpen,
    setActiveCategory,
    notify,
  } = useShop();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveCategory("todos");
    document
      .getElementById("produtos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* promo strip */}
      <div className="bg-magenta py-1.5 text-cream">
        <Marquee
          fast
          items={[
            "★ FRETE GRÁTIS ACIMA DE R$ 60,00",
            "★ ACHADINHOS A PARTIR DE R$ 1,00",
            "★ ATÉ 40% OFF NA LOUCURA DE PREÇOS",
            "★ PARCELE EM ATÉ 3X SEM JUROS",
            "★ SITE DEMONSTRATIVO — PROJETO ESCOLAR",
          ]}
          itemClassName="label px-6 text-[0.62rem] text-cream"
        />
      </div>

      {/* main bar */}
      <div
        className={`border-b-2 border-white/10 transition-all duration-300 ${
          scrolled
            ? "bg-grape/92 shadow-[0_16px_40px_rgba(10,2,30,0.55)] backdrop-blur-xl"
            : "bg-grape/75 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-4 py-3 lg:px-8">
          <a href="#inicio" aria-label="Mais por Menos — início" className="shrink-0">
            <Logo />
          </a>

          <form
            onSubmit={submitSearch}
            className="ml-auto hidden max-w-[520px] flex-1 items-center md:flex"
            role="search"
          >
            <div className="flex w-full items-center gap-2 border-2 border-white/25 bg-white/10 px-4 py-2.5 transition-colors focus-within:border-sun focus-within:bg-white/15">
              <Search className="h-5 w-5 shrink-0 text-sun" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que você está procurando hoje?"
                aria-label="Buscar produtos"
                className="w-full bg-transparent text-[0.95rem] text-cream placeholder:text-cream/55 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpar busca"
                  className="text-cream/70 transition-colors hover:text-sun"
                >
                  <Close className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="ml-1 shrink-0 bg-sun px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-ink transition-transform hover:scale-105"
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1.5 md:ml-4 md:gap-2">
            <button
              type="button"
              onClick={() =>
                notify("Área do cliente: recurso demonstrativo do projeto.", "info")
              }
              aria-label="Minha conta"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 text-cream transition-colors hover:border-sun hover:text-sun sm:flex"
            >
              <User />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("favoritos");
                document
                  .getElementById("produtos")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Favoritos"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 text-cream transition-colors hover:border-magenta hover:text-magenta sm:flex"
            >
              <Heart filled={favorites.length > 0} />
              {favorites.length > 0 && (
                <span className="tnum absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-grape bg-magenta px-1 text-[0.65rem] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrinho"
              className="btn-press relative flex h-11 items-center gap-2 border-2 border-ink bg-sun px-3.5 text-ink shadow-[4px_4px_0_#1B0733] hover:bg-tangerine sm:px-4"
            >
              <Cart className="h-5 w-5" />
              <span className="hidden text-[0.78rem] font-bold uppercase tracking-wide sm:inline">
                Carrinho
              </span>
              <span className="tnum flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-ink bg-magenta px-1 text-[0.72rem] font-bold text-white">
                {count}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 text-cream lg:hidden"
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {/* mobile search */}
        <form
          onSubmit={submitSearch}
          className="flex items-center gap-2 px-4 pb-3 md:hidden"
          role="search"
        >
          <div className="flex w-full items-center gap-2 border-2 border-white/25 bg-white/10 px-3 py-2.5">
            <Search className="h-4.5 w-4.5 shrink-0 text-sun" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você está procurando hoje?"
              aria-label="Buscar produtos"
              className="w-full bg-transparent text-[0.9rem] text-cream placeholder:text-cream/55 focus:outline-none"
            />
          </div>
        </form>

        {/* nav */}
        <nav className="hidden border-t border-white/10 lg:block">
          <div className="mx-auto flex max-w-[1320px] items-center gap-1 px-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-cream/85 transition-colors hover:text-sun"
              >
                {item.label}
                <span className="absolute inset-x-3 bottom-1.5 h-[3px] origin-left scale-x-0 bg-sun transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <span className="ml-auto flex items-center gap-2 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-magenta-light">
              <Sparkle className="h-4 w-4" />
              Economia todo dia
            </span>
            <span className="flex items-center gap-2 border-l border-white/15 pl-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
              <Truck className="h-4 w-4 text-sun" />
              Entrega para todo o Brasil
            </span>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="pop-in border-b-2 border-white/10 bg-grape/97 px-5 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col divide-y divide-white/10">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:text-sun"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("favoritos");
              setOpen(false);
              document
                .getElementById("produtos")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-3 w-full border-2 border-white/25 px-4 py-3 text-[0.85rem] font-semibold uppercase tracking-wider text-cream"
          >
            Meus favoritos ({favorites.length})
          </button>
        </div>
      )}
    </header>
  );
}
