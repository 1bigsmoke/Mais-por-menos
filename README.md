# Mais por Menos — Loja Virtual

> **Tudo o que você precisa, por um precinho que você ama!**
> Projeto escolar demonstrativo de e-commerce, feito com React + Vite + TypeScript + Tailwind CSS.

---

## 1. O que você precisa instalar antes

| Programa | Para que serve | Onde baixar |
|---|---|---|
| **Node.js 20 ou superior** | roda o projeto (vem com o `npm` junto) | <https://nodejs.org> — baixe a versão **LTS** |
| **Visual Studio Code** | editor de código | <https://code.visualstudio.com> |

> Testado com **Node v20.20.2** e **npm 10.8.2**.

### Como saber se o Node já está instalado

Abra o terminal e digite:

```bash
node -v
npm -v
```

Se aparecer algo como `v20.20.2` e `10.8.2`, está tudo certo.
Se der erro tipo "command not found" / "não é reconhecido", instale o Node.js pelo link acima e **feche e abra o VS Code de novo**.

---

## ⚡ Jeito mais rápido de ver o site (sem instalar nada)

Se a pasta **`dist`** já existe no projeto:

1. Abra a pasta `dist`
2. **Dê duplo clique no arquivo `index.html`**
3. O site abre no navegador, completo e funcionando 🎉

Esse arquivo tem **tudo embutido dentro dele** (imagens, estilos, fontes e código),
então funciona **sem servidor e sem internet**. É o arquivo que você leva no pendrive.

> Se a pasta `dist` não existir, rode `npm run build` uma vez (veja a seção 5).
> Para **editar** o site e ver as mudanças na hora, use o `npm run dev` logo abaixo.

---

## 2. Rodando o site no VS Code (passo a passo)

### Passo 1 — Abrir a pasta do projeto

No VS Code: **Arquivo → Abrir Pasta...** (`File → Open Folder...`) e escolha a pasta do projeto
(a pasta que tem o arquivo `package.json` dentro).

> ⚠️ Abra a **pasta inteira**, não um arquivo solto. Se abrir só o `index.html`, nada vai funcionar.

### Passo 2 — Abrir o terminal integrado

Menu **Terminal → Novo Terminal** (`Terminal → New Terminal`)
ou o atalho: <kbd>Ctrl</kbd> + <kbd>'</kbd> (no Mac: <kbd>Ctrl</kbd> + <kbd>`</kbd>)

O terminal abre já dentro da pasta do projeto, lá embaixo na tela.

### Passo 3 — Instalar as dependências (só na primeira vez)

```bash
npm install
```

Demora de 30 segundos a 2 minutos. Vai criar a pasta `node_modules`.
**Isso só precisa ser feito uma vez** (ou quando mudar de computador).

### Passo 4 — Ligar o site

```bash
npm run dev
```

Vai aparecer algo assim:

```
  VITE v7.3.2  ready in 374 ms

  ➜  Local:   http://localhost:5173/
```

### Passo 5 — Abrir no navegador

Segure <kbd>Ctrl</kbd> e clique no link **http://localhost:5173/** que apareceu no terminal
(ou copie e cole o endereço no Chrome/Edge/Firefox).

🎉 **Pronto, o site está rodando!**

### Passo 6 — Para parar o servidor

No terminal, aperte <kbd>Ctrl</kbd> + <kbd>C</kbd>.

---

## 3. Editando e vendo as mudanças na hora

Com o `npm run dev` ligado, é só **salvar** qualquer arquivo (<kbd>Ctrl</kbd> + <kbd>S</kbd>)
que o navegador atualiza sozinho. Não precisa recarregar a página nem reiniciar nada.

---

## 4. Mostrar o site no celular (útil na apresentação)

Com o computador e o celular **na mesma rede Wi-Fi**, rode:

```bash
npm run dev -- --host
```

Vai aparecer uma linha **Network:** com um endereço tipo `http://192.168.0.15:5173/`.
Digite esse endereço no navegador do celular.

---

## 5. Gerar a versão final (para entregar ou apresentar sem internet)

```bash
npm run build
```

Isso cria a pasta **`dist/`** com um único arquivo **`index.html`** — já com todas as
imagens, estilos e scripts embutidos dentro dele.

Você pode dar **duplo clique nesse `dist/index.html`** que ele abre no navegador
funcionando por completo, sem precisar de servidor nem internet. 👌
É esse arquivo que você leva no pendrive para a apresentação.

> ✅ **Funciona offline de verdade:** as fontes (Anton e Archivo) estão embutidas em
> `src/fonts.css`, e as 10 fotos entram no arquivo em base64. O site **não faz
> nenhum pedido para a internet** — pode apresentar numa sala sem Wi-Fi tranquilo.

Para testar a versão final com servidor:

```bash
npm run preview
```

---

## 6. Resumo dos comandos

| Comando | O que faz |
|---|---|
| `npm install` | instala as dependências (só na primeira vez) |
| `npm run dev` | liga o site para desenvolvimento em `localhost:5173` |
| `npm run dev -- --host` | liga e libera o acesso pelo celular na mesma Wi-Fi |
| `npm run build` | gera a versão final em `dist/index.html` |
| `npm run preview` | testa a versão final gerada |

---

## 7. Estrutura das pastas

```
maispormenos/
├── index.html                  ← página base (título, fontes)
├── package.json                ← dependências e comandos
├── public/images/              ← as 10 fotos dos produtos
└── src/
    ├── App.tsx                 ← monta a página na ordem das seções
    ├── index.css               ← cores da marca e todas as animações
    ├── store.tsx               ← carrinho, favoritos, busca e filtros
    ├── assets.ts               ← importa as imagens
    ├── data/
    │   └── products.ts         ← 👈 OS 39 PRODUTOS E PREÇOS FICAM AQUI
    ├── lib/utils.ts            ← utilitário cn() do shadcn
    └── components/
        ├── Background.tsx      ← o "MAIS POR MENOS" girando no fundo
        ├── Header.tsx          ← cabeçalho, busca, carrinho
        ├── Hero.tsx            ← banner principal
        ├── TiltedBand.tsx      ← faixa curva de fotos em movimento
        ├── BannerCarousel.tsx  ← carrossel de banners
        ├── Categories.tsx      ← as 10 categorias
        ├── Products.tsx        ← vitrine com filtros
        ├── ProductCard.tsx     ← card de cada produto
        ├── Offers.tsx          ← "Loucura de Preços"
        ├── Extras.tsx          ← mais vendidos, depoimentos, newsletter
        ├── CartDrawer.tsx      ← carrinho lateral + notificações
        ├── Footer.tsx          ← rodapé
        ├── primitives.tsx      ← logo, etiquetas de preço, títulos
        ├── icons.tsx           ← todos os ícones em SVG
        └── ui/
            └── tilted-grid-hero.tsx   ← componente shadcn da faixa curva
```

### Onde mexer no que

| Quero mudar... | Abra o arquivo |
|---|---|
| Preços, nomes e produtos | `src/data/products.ts` |
| Cores da marca | `src/index.css` (bloco `@theme`) |
| Textos do banner principal | `src/components/Hero.tsx` |
| Velocidade do fundo girando | `src/index.css` (procure `ring-spin`) |
| Ordem das seções da página | `src/App.tsx` |

---

## 8. O que funciona de verdade e o que é demonstrativo

### ✅ Funciona de verdade (no navegador)

- Carrinho completo: adicionar, remover, aumentar/diminuir quantidade
- Cálculo de subtotal, desconto, frete e total
- Contador de itens no ícone do carrinho
- Busca por nome, categoria ou descrição
- Filtro pelas 10 categorias + ordenação por preço/avaliação
- Favoritos com contador
- Notificações de "produto adicionado"
- Carrossel de banners, botão voltar ao topo, animações ao rolar
- Responsivo no celular, tablet e computador

### ⚠️ Apenas demonstrativo (projeto escolar)

- **Não processa pagamento** — "Finalizar compra" só mostra uma confirmação na tela
- **Não tem banco de dados** — ao recarregar a página o carrinho esvazia
- **Depoimentos são exemplos fictícios**, não são opiniões reais de clientes
- **Contato, endereço e telefone do rodapé são fictícios**
- **Newsletter não envia nada** — a confirmação é só local
- Preços e descontos são ilustrativos

---

## 9. Problemas comuns

| Problema | Solução |
|---|---|
| `npm: command not found` | Instale o Node.js e reabra o VS Code |
| `Cannot find module` ou tela branca | Rode `npm install` de novo |
| "A porta 5173 já está em uso" | O site já está rodando em outra aba, ou aperte <kbd>Ctrl</kbd>+<kbd>C</kbd> e rode de novo |
| Abri o `index.html` com duplo clique e deu tela branca | Esse é o arquivo base. Use `npm run dev`, ou abra o `dist/index.html` depois de rodar `npm run build` |
| Mudei o código e não atualizou | Salve o arquivo (<kbd>Ctrl</kbd>+<kbd>S</kbd>); se não, recarregue com <kbd>Ctrl</kbd>+<kbd>F5</kbd> |

---

**MAIS POR MENOS — Economia, variedade e praticidade em um só lugar!**
Projeto escolar demonstrativo, sem fins comerciais.
