(function () {
  //pega o id da url
  const id = new URLSearchParams(location.search).get("id");
  let idFormatado = Number(id)
  const produto = window.getProduct(idFormatado);
  const root = document.getElementById("pd-root");

  console.log(produto)



  if (!produto) {
    root.innerHTML = `<div class="container"><h1>Produto não encontrado</h1><p class="muted">Volte ao <a href="../../index.html" style="color:var(--primary)">catálogo</a>.</p></div>`;
    return;
  }
  document.title = `${produto.nome} — Sorvetudos`;

  //pega 4 produtos diferentes do produto atual
  const related = window.PRODUTOS.filter(x => x.id !== produto.nome).slice(0, 4);
  console.log(produto)

  root.innerHTML = `
    <div class="container">
      <a href="../../index.html" class="back">← Voltar</a>
      <div class="pd-grid">
        <div class="pd-img surgir">
          <img src="${'..' + produto.img}" alt="${escapeHtml(produto.nome)}">
        </div>
        <div class="pd-info surgir" style="animation-delay:100ms">
          <span class="cat">${escapeHtml(produto.categorias[0].nome)}</span>
          <h1>${escapeHtml(produto.nome)}</h1>
          <p class="flavor">${escapeHtml(produto.sabores[0].sabor)}</p>
          <p class="desc">${escapeHtml(produto.descricao)}</p>
          <h3 class="ing-l">Ingredientes</h3>
          <div class="pd-ings">${produto.ingredientes.map(i => `<span>${escapeHtml(i.ingrediente)}</span>`).join("")}</div>
          <div class="pd-price"><div class="l">A partir de</div><div class="v">${formatarPreco(produto.preco)}</div></div>
        </div>
      </div>
      <section class="related">
        <h2 class="serif">Você também vai amar</h2>
        <div class="grid-2">
          ${related.map((r, i) => `
            <a href="product.html?id=${r.id}" class="product-card" style="animation-delay:${i*50}ms">
              <div class="product-img"><img src="${'..' + r.img}" alt="${escapeHtml(r.nome)}" loading="lazy">${r.tag ? `<span class="product-tag">${escapeHtml(r.tag)}</span>`:""}</div>
              <div class="product-info">
                <div class="meta"><span>${escapeHtml(r.categorias[0].nome)}</span></div>
                <h3>${escapeHtml(r.nome)}</h3>
                <p>${escapeHtml(r.sabores[0].sabor)}</p>
              </div>
              <div class="product-price"><span>${formatarPreco(r.preco)}</span></div>
              <div class="product-price-mobile">${formatarPreco(r.preco)}</div>
            </a>`).join("")}
        </div>
      </section>
    </div>`;
})();
