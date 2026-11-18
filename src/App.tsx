import { useEffect, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TiltedBand from "./components/TiltedBand";
import Categories from "./components/Categories";
import BannerCarousel from "./components/BannerCarousel";
import Products from "./components/Products";
import Offers, { MarqueeBand } from "./components/Offers";
import {
  BestSellers,
  Newsletter,
  Testimonials,
  WeekFinds,
  WhyUs,
} from "./components/Extras";
import CartDrawer, { Toasts } from "./components/CartDrawer";
import Footer from "./components/Footer";
import { useReveal } from "./components/primitives";
import { ShopProvider } from "./store";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[70] flex h-13 w-13 items-center justify-center border-2 border-ink bg-sun text-ink shadow-[5px_5px_0_#1B0733] transition-all duration-300 hover:bg-magenta hover:text-white ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}

function Page() {
  useReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />

      <div className="relative z-10">
        <Header />

        <main>
          <Hero />
          <TiltedBand />

          <MarqueeBand
            bg="#FF2D78"
            color="#FFF6EC"
            rotate={-2}
            items={[
              "LOUCURA DE PREÇOS",
              "A PARTIR DE R$ 1,00",
              "ATÉ 40% OFF",
              "PEQUENOS PREÇOS, GRANDES DESCOBERTAS",
            ]}
          />

          <Categories />
          <BannerCarousel />
          <Offers />

          <MarqueeBand
            bg="#FFD227"
            color="#1B0733"
            rotate={1.6}
            items={[
              "SUA CASA COMPLETA, SEU BOLSO FELIZ",
              "FRETE GRÁTIS ACIMA DE R$ 60",
              "NOVIDADES TODA SEMANA",
            ]}
          />

          <Products />
          <BestSellers />
          <WeekFinds />
          <WhyUs />
          <Testimonials />
          <Newsletter />
        </main>

        <Footer />
      </div>

      <CartDrawer />
      <Toasts />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Page />
    </ShopProvider>
  );
}
