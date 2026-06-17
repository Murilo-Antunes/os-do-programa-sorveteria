import { pegarProdutoRelacionados } from "./main.js";
(async function () {
  const id = new URLSearchParams(location.search).get("id");
  const idFormatado = Number(id);
  const root = document.getElementById("pd-root");

  
  const produto = await window.getProduct(idFormatado);

  if (!produto) {
    root.innerHTML = `<div class="container"><h1>Produto não encontrado</h1><p class="muted">Volte ao <a href="../../index.html" style="color:var(--primary)">catálogo</a>.</p></div>`;
    return;
  }

  document.title = `${produto.nome} — Sorvetudos`;

  //Related Temporário
  const related = await pegarProdutoRelacionados(produto.id)
  console.log(related)

  root.innerHTML = `
    <div class="container">
      <a href="../../index.html" class="back">← Voltar</a>
      <div class="pd-grid">
        <div class="pd-img surgir">
          <img src="${produto.img}" alt="${escapeHtml(produto.nome)}">
        </div>
        <div class="pd-info surgir" style="animation-delay:100ms">
          <!-- CORREÇÃO: era produto.categorias[0].nome → produto.categoria[0].categoria -->
          <span class="cat">${escapeHtml(produto.categoria[0].categoria)}</span>
          <h1>${escapeHtml(produto.nome)}</h1>
          <!-- CORREÇÃO: era produto.sabores[0].sabor → produto.sabor[0].sabor -->
          <p class="flavor">${escapeHtml(produto.sabor[0].sabor)}</p>
          <p class="desc">${escapeHtml(produto.descricao)}</p>
          <h3 class="ing-l">Ingredientes</h3>
          <!-- CORREÇÃO: era produto.ingredientes → produto.ingrediente -->
          <div class="pd-ings">${produto.ingrediente.map(i => `<span>${escapeHtml(i.ingrediente)}</span>`).join("")}</div>
          <div class="pd-price">
            <div class="l">A partir de</div>
            <div class="v">${escapeHtml(Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</div>
          </div>
        </div>
      </div>
      <section class="related">
        <h2 class="serif">Você também vai amar</h2>
        <div class="grid-2">
          ${related.map((r, i) => 
            `
            <a href="product.html?id=${r.id}" class="product-card" style="animation-delay:${i * 50}ms">
              <div class="product-img">
                <img src="${r.img}" alt="${escapeHtml(r.nome)}" loading="lazy">
                ${r.tag?.length
                  ? r.tag.map(t => `<span class="product-tag">${escapeHtml(t.tag)}</span>`).join("")
                  : ""}
              </div>
              <div class="product-info">
                <div class="meta"><span>${escapeHtml(r.categoria[0].categoria)}</span></div>
                <h3>${escapeHtml(r.nome)}</h3>
                <p>${escapeHtml(r.sabor[0].sabor)}</p>
              </div>
              <div class="product-price"><span>${escapeHtml(Number(r.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</span></div>
              <div class="product-price-mobile">${escapeHtml(Number(r.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</div>
            </a>`).join("")}
        </div>
      </section>
    </div>`;
})();