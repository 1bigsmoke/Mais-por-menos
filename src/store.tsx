import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./data/products";

export type CartItem = { product: Product; qty: number };
export type Toast = { id: number; text: string; tone: "add" | "fav" | "info" };

type ShopState = {
  cart: CartItem[];
  favorites: string[];
  toasts: Toast[];
  cartOpen: boolean;
  query: string;
  activeCategory: string;
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  setCartOpen: (v: boolean) => void;
  setQuery: (v: string) => void;
  setActiveCategory: (v: string) => void;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  notify: (text: string, tone?: Toast["tone"]) => void;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const notify = useCallback((text: string, tone: Toast["tone"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, tone }]);
    window.setTimeout(
      () => setToasts((t) => t.filter((item) => item.id !== id)),
      3200,
    );
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setCart((prev) => {
        const found = prev.find((i) => i.product.id === p.id);
        if (found) {
          return prev.map((i) =>
            i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i,
          );
        }
        return [...prev, { product: p, qty: 1 }];
      });
      notify(`${p.name} foi para o carrinho!`, "add");
    },
    [notify],
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((prev) => prev.filter((i) => i.product.id !== id));
      notify("Produto removido do carrinho.", "info");
    },
    [notify],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback(
    (id: string) => {
      const has = favorites.includes(id);
      setFavorites((prev) =>
        has ? prev.filter((f) => f !== id) : [...prev, id],
      );
      notify(
        has ? "Removido dos favoritos." : "Adicionado aos favoritos!",
        "fav",
      );
    },
    [favorites, notify],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  const discount = subtotal >= 60 ? subtotal * 0.05 : 0;
  const shipping = subtotal === 0 || subtotal >= 60 ? 0 : 9.9;
  const total = subtotal - discount + shipping;

  const value = useMemo<ShopState>(
    () => ({
      cart,
      favorites,
      toasts,
      cartOpen,
      query,
      activeCategory,
      count,
      subtotal,
      discount,
      shipping,
      total,
      setCartOpen,
      setQuery,
      setActiveCategory,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleFavorite,
      isFavorite,
      notify,
    }),
    [
      cart,
      favorites,
      toasts,
      cartOpen,
      query,
      activeCategory,
      count,
      subtotal,
      discount,
      shipping,
      total,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleFavorite,
      isFavorite,
      notify,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop precisa estar dentro de ShopProvider");
  return ctx;
}

export const ALL_PRODUCTS = PRODUCTS;
