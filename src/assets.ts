// Imagens geradas para o projeto e importadas pelo bundler (ficam embutidas no build).
import hero from "../public/images/hero.jpg";
import promo from "../public/images/promo.jpg";
import achadinhos from "../public/images/achadinhos.jpg";
import limpeza from "../public/images/cat-limpeza.jpg";
import cozinha from "../public/images/cat-cozinha.jpg";
import mesa from "../public/images/cat-mesa.jpg";
import panos from "../public/images/cat-panos.jpg";
import organizacao from "../public/images/cat-organizacao.jpg";
import casa from "../public/images/cat-casa.jpg";
import papelaria from "../public/images/cat-papelaria.jpg";

export const IMG = {
  hero,
  promo,
  achadinhos,
  limpeza,
  cozinha,
  mesa,
  panos,
  organizacao,
  casa,
  papelaria,
};

export type ImgKey = keyof typeof IMG;
