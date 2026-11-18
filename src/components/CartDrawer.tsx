import { useState } from "react";
import { brl } from "../data/products";
import { useShop } from "../store";
import { IMG } from "../assets";
import {
  ArrowRight,
  Check,
  Close,
  Minus,
  Plus,
  Shield,
  Trash,
  Truck,
} from "./icons";

export function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pop-in pointer-events-auto flex w-full max-w-[78vw] items-center gap-3 border-2 border-ink px-5 py-3 text-[0.85rem] font-semibold text-ink shadow-[6px_6px_0_rgba(27,7,51,0.45)] sm:max-w-[420px]"
          style={{
            background:
              t.tone === "add" ? "#FFD227" : t.tone === "fav" ? "#FFC0D8" : "#FFF6EC",
          }}
        >
          {t.tone === "add" ? (
            <Check className="h-5 w-5 shrink-0" />
          ) : (
            <ArrowRight className="h-5 w-5 shrink-0" />
          )}
          {t.text}
        </div>
      ))}
    </div>
  );
}

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    setQty,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    count,
    notify,
  } = useShop();
  const [done, setDone] = useState(false);

  const close = () => {
    setCartOpen(false);
    window.setTimeout(() => setDone(false), 300);
  };

  const finish = () => {
    if (cart.length === 0) return;
    setDone(true);
    clearCart();
    notify("Pedido demonstrativo registrado com sucesso!", "add");
  };

  return (
    <>
      {/* overlay */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[80] bg-grape/70 backdrop-blur-sm transition-opacity duration-400 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer */}
      <aside
        aria-label="Carrinho de compras"
        aria-hidden={!cartOpen}
        className={`fixed right-0 top-0 z-[85] flex h-full w-full max-w-[440px] flex-col border-l-2 border-ink bg-cream transition-transform duration-400 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-18px 0 50px rgba(10,2,30,0.45)" }}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-4">
          <div>
            <p className="label text-[0.58rem] text-sun">Carrinho de compras</p>
            <p className="display text-[1.55rem] leading-none text-cream">
              {count} {count === 1 ? "item" : "itens"}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar carrinho"
            className="flex h-10 w-10 items-center justify-center border-2 border-cream/40 text-cream transition-colors hover:border-sun hover:text-sun"
          >
            <Close />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto">
          {done ? (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-sun">
                <Check className="h-10 w-10 text-ink" />
              </div>
              <h3 className="display mt-6 text-[1.85rem] leading-tight text-ink">
                Pedido demonstrativo registrado!
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
                Obrigado por testar a Mais por Menos. Este é um projeto escolar:
                nenhum pagamento é processado e nenhum dado é enviado.
              </p>
              <button
                type="button"
                onClick={close}
                className="btn-press mt-7 border-2 border-ink bg-magenta px-7 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white shadow-[5px_5px_0_#1B0733]"
              >
                Continuar comprando
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <img
                src={IMG.achadinhos}
                alt=""
                className="h-36 w-full max-w-[260px] border-2 border-ink object-cover opacity-85"
              />
              <h3 className="display mt-6 text-[1.75rem] leading-tight text-ink">
                Seu carrinho está vazio
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
                Que tal aproveitar a LOUCURA DE PREÇOS e começar pelos
                achadinhos a partir de R$ 1,00?
              </p>
              <button
                type="button"
                onClick={close}
                className="btn-press mt-7 border-2 border-ink bg-sun px-7 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink shadow-[5px_5px_0_#1B0733] hover:bg-tangerine"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="divide-y-2 divide-ink/10">
              {cart.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3.5 p-4">
                  <img
                    src={IMG[product.img]}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 border-2 border-ink object-cover"
                    style={{ objectPosition: product.pos }}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[0.88rem] font-bold leading-snug text-ink">
                      {product.name}
                    </p>
                    <p className="tnum text-[0.72rem] text-ink/55">
                      {brl(product.price)} por unidade
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center border-2 border-ink">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="Diminuir quantidade"
                          className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-sun"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="tnum w-8 text-center text-[0.85rem] font-bold text-ink">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="Aumentar quantidade"
                          className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-sun"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="tnum display text-[1.35rem] leading-none text-ink">
                        {brl(product.price * qty)}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remover ${product.name}`}
                        className="flex h-8 w-8 items-center justify-center border-2 border-ink/25 text-ink/60 transition-colors hover:border-magenta hover:bg-magenta hover:text-white"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* summary */}
        {!done && cart.length > 0 && (
          <div className="border-t-2 border-ink bg-white px-5 py-5">
            <dl className="space-y-2 text-[0.86rem]">
              <div className="flex justify-between text-ink/75">
                <dt>Subtotal ({count} itens)</dt>
                <dd className="tnum font-semibold text-ink">{brl(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-ink/75">
                <dt>Desconto promocional</dt>
                <dd className="tnum font-semibold text-magenta-dark">
                  {discount > 0 ? `-${brl(discount)}` : "—"}
                </dd>
              </div>
              <div className="flex justify-between text-ink/75">
                <dt>Frete</dt>
                <dd className="tnum font-semibold text-ink">
                  {shipping === 0 ? "Grátis" : brl(shipping)}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t-2 border-ink/15 pt-3">
                <dt className="label text-[0.58rem] text-ink/60">Total</dt>
                <dd className="display tnum text-[2rem] leading-none text-ink">
                  {brl(total)}
                </dd>
              </div>
            </dl>

            {subtotal < 60 && (
              <p className="mt-3 border-2 border-ink bg-sun px-3 py-2 text-[0.75rem] font-semibold text-ink">
                Faltam <strong className="tnum">{brl(60 - subtotal)}</strong>{" "}
                para você ganhar frete grátis.
              </p>
            )}

            <button
              type="button"
              onClick={finish}
              className="btn-press mt-4 flex w-full items-center justify-center gap-2 border-2 border-ink bg-magenta px-6 py-4 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-white shadow-[5px_5px_0_#1B0733] hover:bg-tangerine"
            >
              Finalizar compra
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={close}
              className="mt-2.5 w-full py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink/70 underline transition-colors hover:text-magenta-dark"
            >
              Continuar comprando
            </button>

            <div className="mt-3 flex items-center justify-center gap-4 text-[0.68rem] text-ink/60">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Compra simulada
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" /> Frete grátis acima de R$ 60
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
