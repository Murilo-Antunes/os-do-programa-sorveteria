import { pegarProdutoRelacionados } from "./main.js";

// --- Helpers de acesso seguro ---
const attr = (arr, prop, fallback = "—") =>
  arr?.length ? escapeHtml(arr[0][prop]) : fallback;

const attrList = (arr, prop) =>
  arr?.length
    ? arr.map(i => `<span>${escapeHtml(i[prop])}</span>`).join("")
    : "";

const formatPrice = (preco) =>
  escapeHtml(Number(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));

// --- Card de produto relacionado ---
function cardRelacionado(r, i) {
  return `
    <a href="product.html?id=${r.id}" class="product-card" style="animation-delay:${i * 50}ms">
      <div class="product-img">
        <img src="${r.img}" alt="${escapeHtml(r.nome)}" loading="lazy">
        ${r.tag?.length ? `<span class="product-tag">${attr(r.tag, "tag")}</span>` : ""}
      </div>
      <div class="product-info">
        <div class="meta"><span>${attr(r.categoria, "categoria")}</span></div>
        <h3>${escapeHtml(r.nome)}</h3>
        <p>${attr(r.sabor, "sabor")}</p>
      </div>
      <div class="product-price"><span>${formatPrice(r.preco)}</span></div>
      <div class="product-price-mobile">${formatPrice(r.preco)}</div>
    </a>`;
}

// --- Main ---
(async function () {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const root = document.getElementById("pd-root");

  const produto = await window.getProduct(id);

  if (!produto) {
    root.innerHTML = `
      <div class="container">
        <h1>Produto não encontrado</h1>
        <p class="muted">Volte ao <a href="../../index.html" style="color:var(--primary)">catálogo</a>.</p>
      </div>`;
    return;
  }

  document.title = `${produto.nome} — Sorvetudos`;

  const related = await pegarProdutoRelacionados(produto.id);

  root.innerHTML = `
    <div class="container">
      <a href="../../index.html" class="back">← Voltar</a>
      <div class="pd-grid">
        <div class="pd-img surgir">
          <img src="${produto.img}" alt="${escapeHtml(produto.nome)}">
        </div>
        <div class="pd-info surgir" style="animation-delay:100ms">
          <span class="cat">${attr(produto.categoria, "categoria")}</span>
          <h1>${escapeHtml(produto.nome)}</h1>
          <p class="flavor">${attr(produto.sabor, "sabor")}</p>
          <p class="desc">${escapeHtml(produto.descricao)}</p>
          <h3 class="ing-l">Ingredientes</h3>
          <div class="pd-ings">${attrList(produto.ingrediente, "ingrediente")}</div>
          <div class="pd-price">
            <div class="l">A partir de</div>
            <div class="v">${formatPrice(produto.preco)}</div>
          </div>
        </div>
      </div>
      <section class="related">
        <h2 class="serif">Você também vai amar</h2>
        <div class="grid-2">
          ${related.map(cardRelacionado).join("")}
        </div>
      </section>
    </div>`;
})();