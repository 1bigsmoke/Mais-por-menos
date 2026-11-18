import { CATEGORIES } from "../data/products";
import { useShop } from "../store";
import { Logo, Marquee } from "./primitives";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Pin,
  TikTok,
  Youtube,
} from "./icons";

const SOCIALS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: TikTok, label: "TikTok" },
  { Icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  const { setActiveCategory, setQuery } = useShop();

  const goCategory = (id: string) => {
    setQuery("");
    setActiveCategory(id);
    document
      .getElementById("produtos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative border-t-2 border-ink">
      <div className="bg-sun py-2">
        <Marquee
          items={[
            "MAIS POR MENOS — ECONOMIA, VARIEDADE E PRATICIDADE EM UM SÓ LUGAR!",
            "PROJETO ESCOLAR DEMONSTRATIVO",
          ]}
          itemClassName="label px-6 text-[0.62rem] text-ink"
        />
      </div>

      <div className="bg-grape">
        <div className="mx-auto max-w-[1320px] px-5 py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* brand */}
            <div className="lg:col-span-4">
              <Logo />
              <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-cream/85">
                Tudo o que você precisa, por um precinho que você ama!{" "}
                <span className="text-sun">
                  Economia, variedade e praticidade em um só lugar.
                </span>
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {SOCIALS.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#inicio"
                    aria-label={label}
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex h-11 w-11 items-center justify-center border-2 border-white/25 text-cream transition-all hover:-translate-y-1 hover:border-sun hover:bg-sun hover:text-ink"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              <div className="mt-7 space-y-2.5 text-[0.85rem] text-cream/80">
                <p className="flex items-start gap-2.5">
                  <Pin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sun" />
                  Av. das Nações, 1.200 — Centro, São Paulo — SP
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="h-4.5 w-4.5 shrink-0 text-sun" />
                  (11) 4002-8922
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4.5 w-4.5 shrink-0 text-sun" />
                  atendimento@maispormenos.com.br
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="h-4.5 w-4.5 shrink-0 text-sun" />
                  Seg a Sex, das 8h às 18h
                </p>
              </div>
              <p className="label mt-4 text-[0.5rem] text-magenta-light">
                Contato fictício — dados demonstrativos
              </p>
            </div>

            {/* categories */}
            <div className="lg:col-span-3">
              <h3 className="label text-sun">Categorias</h3>
              <ul className="mt-5 space-y-2.5">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => goCategory(c.id)}
                      className="text-[0.9rem] text-cream/80 transition-colors hover:translate-x-1 hover:text-sun"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* about */}
            <div className="lg:col-span-2">
              <h3 className="label text-sun">Sobre a loja</h3>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Nossa história",
                  "Nossas lojas",
                  "Trabalhe conosco",
                  "Seja um fornecedor",
                  "Programa de afiliados",
                  "Imprensa",
                ].map((t) => (
                  <li key={t}>
                    <a
                      href="#sobre"
                      className="text-[0.9rem] text-cream/80 transition-colors hover:text-sun"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* support */}
            <div className="lg:col-span-3">
              <h3 className="label text-sun">Atendimento</h3>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Central de atendimento",
                  "Política de privacidade",
                  "Termos de uso",
                  "Trocas e devoluções",
                  "Prazos e entregas",
                  "Perguntas frequentes",
                ].map((t) => (
                  <li key={t}>
                    <a
                      href="#inicio"
                      className="text-[0.9rem] text-cream/80 transition-colors hover:text-sun"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-2 border-white/20 p-4">
                <p className="text-[0.82rem] leading-relaxed text-cream/80">
                  Pagamento simulado para fins educacionais. Nenhuma transação
                  financeira é realizada neste projeto.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/15 pt-7 md:flex-row">
            <p className="text-center text-[0.82rem] text-cream/70 md:text-left">
              © 2026 Mais por Menos — Todos os direitos reservados. Projeto escolar
              demonstrativo, sem fins comerciais.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-[0.14em] text-cream/60">
              <a href="#inicio" className="transition-colors hover:text-sun">
                Política de privacidade
              </a>
              <a href="#inicio" className="transition-colors hover:text-sun">
                Termos de uso
              </a>
              <a href="#inicio" className="transition-colors hover:text-sun">
                Cookies
              </a>
            </div>
          </div>

          <p className="display mt-10 text-center text-[clamp(1.35rem,3.6vw,2.45rem)] leading-tight text-cream/25">
            Mais por Menos — Economia, variedade e praticidade em um só lugar!
          </p>
        </div>
      </div>
    </footer>
  );
}
