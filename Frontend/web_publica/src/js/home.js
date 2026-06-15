const BASE_URL = 'http://localhost:8080/v1/sorvetudos/catalogo';
const PAGE_SIZE = 6;

const state = {
  cat: "Todos",
  query: "",
  sizes: [],
  sabores: [],
  tags: [],
  visible: PAGE_SIZE,
  showFilters: false
};

// ─── Card HTML ────────────────────────────────────────────────────────────────

function productCardHtml(produto, i) {
  return `<a href="./src/pages/product.html?id=${produto.id}" class="product-card" style="animation-delay:${i * 50}ms">
  <div class="product-img">
    <img src="${'./src' + produto.img}" alt="${escapeHtml(produto.nome)}" loading="lazy">
    ${produto.tag?.length
      ? produto.tag.map(tag => `<span class="product-tag">${escapeHtml(tag.tag)}</span>`).join("")
      : ""}
  </div>
  <div class="product-info">
    <div class="meta"><span>${escapeHtml(produto.categoria[0].categoria)}</span></div>
    <h3>${escapeHtml(produto.nome)}</h3>
    <p>${escapeHtml(produto.sabor[0].sabor)}</p>
  </div>
  <div class="product-price">
    <span>${produto.preco}</span>
  </div>
  <div class="product-price-mobile">${produto.preco}</div>
</a>`;
}

// ─── Chamada de filtro/pesquisa na API ───────────────────────────────────────

async function fetchProdutosFiltrados() {
  try {
    // Se há query de texto, usa o endpoint de pesquisa
    if (state.query.trim()) {
      console.log('a')
      const res = await fetch(
        `${BASE_URL}/produtos/pesquisa?nome=${encodeURIComponent(state.query.trim())}`
      );
      const data = await res.json();
      return data.response.produto ?? [];
    }

    // Monta os query params para o endpoint de filtro
    const params = new URLSearchParams();

    if (state.cat !== "Todos")  params.append("categoria", state.cat);
    state.sizes.forEach(s =>    params.append("tamanho", s));
    state.sabores.forEach(s =>  params.append("sabor", s));
    state.tags.forEach(t =>     params.append("tag", t));

    // Se não há nenhum filtro ativo, usa /produtos direto (evita 500 no /filtro?)
    if (params.toString() === "") {
      return window.PRODUTOS;
    }

    console.log(params.toString())

    const res = await fetch(`${BASE_URL}/produtos/filtro?${params.toString()}`);

    if (!res.ok) {
      console.error(`Erro ${res.status} no filtro — mostrando todos os produtos`);
      return window.PRODUTOS;
    }

    const data = await res.json();
    return data.response.produto ?? [];

  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return window.PRODUTOS;
  }
}

// ─── Render ───────────────────────────────────────────────────────────────────

export const render = async () => {
  // 1. Categorias
  document.getElementById("categoria-catalogo").innerHTML = [
    `<button class="cat-pill ${state.cat === "Todos" ? "active" : ""}" data-cat="Todos">Todos</button>`,
    ...window.categorias.map(categoria =>
      `<button class="cat-pill ${state.cat === categoria.categoria ? "active" : ""}" data-cat="${categoria.categoria}">${categoria.categoria}</button>`
    )
  ].join("");

  // 2. Painel de filtros — renderiza ANTES de usar classList.toggle("open")
  document.getElementById("filters-panel").innerHTML = `
    <div class="filters-grid">
      <div>
        <p class="filter-l">Sabores</p>
        <div class="size-btns">
          ${window.SABORES.map(s =>
            `<button class="size-btn ${state.sabores.includes(s.sabor) ? "active" : ""}" data-sabor="${s.sabor}">${s.sabor}</button>`
          ).join("")}
        </div>
      </div>
      <div>
        <p class="filter-l">Tamanho</p>
        <div class="size-btns">
          ${window.SIZES.map(s =>
            // CORREÇÃO: s é objeto {id, tamanho}, não string
            `<button class="size-btn ${state.sizes.includes(s.tamanho) ? "active" : ""}" data-size="${s.tamanho}">${s.tamanho}</button>`
          ).join("")}
        </div>
        <p class="filter-minmax" style="margin-top:12px">P · 90ml · M · 180ml · G · 320ml</p>
      </div>
      <div>
        <p class="filter-l">Tags</p>
        <div class="size-btns">
          ${window.TAGS.map(t =>
            `<button class="size-btn ${state.tags.includes(t.tag) ? "active" : ""}" data-tag="${t.tag}">${t.tag}</button>`
          ).join("")}
        </div>
      </div>
    </div>
    <div class="filters-foot">
      <p class="info" id="filter-count"></p>
      <button class="btn-link" id="reset-filters">✕ Limpar filtros</button>
    </div>
  `;

  // 3. Agora que o painel existe no DOM, aplica a classe open
  document.getElementById("filters-panel").classList.toggle("open", state.showFilters);

  // 4. Re-registra listeners do painel (innerHTML substituiu os anteriores)
  bindFilterListeners();

  // 5. Busca produtos filtrados na API
  const produtos = await fetchProdutosFiltrados();

  // 6. Grid de produtos
  const shown = produtos.slice(0, state.visible);
  const grid = document.getElementById("catalog-grid");

  grid.innerHTML = shown.length === 0
    ? `<div class="empty" style="grid-column:1/-1"><div class="icon">🍨</div><p>Nenhum sabor encontrado.</p></div>`
    : shown.map((produto, i) => productCardHtml(produto, i)).join("");

  // 7. Botão ver mais
  document.getElementById("see-more").style.display =
    state.visible < produtos.length ? "flex" : "none";

  // 8. Badge de filtros ativos
  const activeCount =
    (state.cat !== "Todos" ? 1 : 0) +
    (state.query ? 1 : 0) +
    (state.sizes.length > 0 ? 1 : 0) +
    (state.sabores.length > 0 ? 1 : 0) +
    (state.tags.length > 0 ? 1 : 0);

  document.getElementById("filters-btn").classList.toggle("active", state.showFilters);
  document.getElementById("filters-badge").innerHTML = activeCount > 0 ? activeCount : "";
  document.getElementById("filters-badge").style.display = activeCount > 0 ? "inline-grid" : "none";

  // 9. Contagem — agora o elemento já existe no DOM (criado acima no innerHTML)
  document.getElementById("filter-count").textContent =
    produtos.length + " " + (produtos.length === 1 ? "sabor encontrado" : "sabores encontrados");
};

// ─── Listeners do painel (re-registrados a cada render) ─────────────────────

const bindFilterListeners = () => {
  document.querySelectorAll("[data-sabor]").forEach(b => {
    b.addEventListener("click", () => {
      const s = b.dataset.sabor;
      state.sabores = state.sabores.includes(s)
        ? state.sabores.filter(x => x !== s)
        : [...state.sabores, s];
      state.visible = PAGE_SIZE;
      render();
    });
  });

  document.querySelectorAll("[data-size]").forEach(b => {
    b.addEventListener("click", () => {
      const s = b.dataset.size;
      state.sizes = state.sizes.includes(s)
        ? state.sizes.filter(x => x !== s)
        : [...state.sizes, s];
      state.visible = PAGE_SIZE;
      render();
    });
  });

  document.querySelectorAll("[data-tag]").forEach(b => {
    b.addEventListener("click", () => {
      const t = b.dataset.tag;
      state.tags = state.tags.includes(t)
        ? state.tags.filter(x => x !== t)
        : [...state.tags, t];
      state.visible = PAGE_SIZE;
      render();
    });
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    state.cat = "Todos";
    state.query = "";
    state.sizes = [];
    state.sabores = [];
    state.tags = [];
    state.visible = PAGE_SIZE;
    document.getElementById("catalog-search").value = "";
    render();
  });
};

// ─── Listeners estáticos (registrados uma única vez) ─────────────────────────

document.getElementById("categoria-catalogo").addEventListener("click", e => {
  const b = e.target.closest("[data-cat]");
  if (!b) return;
  state.cat = b.dataset.cat;
  state.visible = PAGE_SIZE;
  render();
});

document.getElementById("catalog-search").addEventListener("input", e => {
  state.query = e.target.value;
  state.visible = PAGE_SIZE;
  render();
});

document.getElementById("filters-btn").addEventListener("click", () => {
  state.showFilters = !state.showFilters;
  render();
});

document.getElementById("see-more").addEventListener("click", () => {
  state.visible += PAGE_SIZE;
  render();
});