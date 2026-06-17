const BASE_URL = 'https://backend-catalogo-sorvetudos.onrender.com/v1/sorvetudos/catalogo';

// ─── Pega a query da URL (vinda do header search) ────────────────────────────

const params  = new URLSearchParams(location.search);
const queryInicial = params.get("pesquisa") ?? "";

// ─── Elementos do DOM ────────────────────────────────────────────────────────

const input    = document.getElementById("search-input");
const form     = document.getElementById("search-form");
const title    = document.getElementById("search-title");
const sub      = document.getElementById("search-sub");
const results  = document.getElementById("search-results");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cardHtml(produto, i) {
  const nome      = produto.nome ?? "Sem nome";
  const img       = produto.img
    ? (produto.img.startsWith("http") ? produto.img : "../img" + produto.img)
    : "";
  const preco     = Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? "—";
  const categoria = Array.isArray(produto.categoria) && produto.categoria.length
    ? produto.categoria[0].categoria : "Sem categoria";
  const sabor     = Array.isArray(produto.sabor) && produto.sabor.length
    ? produto.sabor[0].sabor : "Sem sabor";
  const tags      = Array.isArray(produto.tag) && produto.tag.length
    ? produto.tag.map(t => `<span class="product-tag">${escapeHtml(t.tag)}</span>`).join("") : "";

  return `
    <a href="product.html?id=${produto.id}" class="product-card" style="animation-delay:${i * 50}ms">
      <div class="product-img">
        <img src="${img}" alt="${escapeHtml(nome)}" loading="lazy">
        ${tags}
      </div>
      <div class="product-info">
        <div class="meta"><span>${escapeHtml(categoria)}</span></div>
        <h3>${escapeHtml(nome)}</h3>
        <p>${escapeHtml(sabor)}</p>
      </div>
      <div class="product-price"><span>${escapeHtml(String(preco))}</span></div>
      <div class="product-price-mobile">${escapeHtml(String(preco))}</div>
    </a>`;
}

function emptyHtml(query) {
  return `
    <div class="search-empty">
      <div class="icon-wrap">🍨</div>
      <h2>Nenhum resultado</h2>
      <p>Não encontramos nada para "<strong>${escapeHtml(query)}</strong>".<br>Tente outro termo.</p>
      <a href="../../index.html#sabores" class="cta">Ver todos os sabores →</a>
    </div>`;
}

// ─── Busca na API ─────────────────────────────────────────────────────────────

async function buscar(query) {

    const q = query.trim();

    // Atualiza título
    title.innerHTML = q
        ? `Resultados para <span class="q">"${escapeHtml(q)}"</span>`
        : "Buscar sabores";
    sub.textContent = "";
    results.innerHTML = `<p style="color:var(--muted-fg);font-size:14px">Buscando…</p>`;

    if (!q) {
        results.innerHTML = "";
        return;
    }

    try {
        const res  = await fetch(`${BASE_URL}/produtos/pesquisa?nome_produto=${encodeURIComponent(q)}`);
        const data = await res.json();
        console.log(data)
        const produtos = Array.isArray(data.response?.pesquisa) ? data.response.pesquisa.map(item => item.produto[0]).filter(Boolean) : [];
        console.log(produtos)

        sub.textContent = produtos.length
        ? `${produtos.length} ${produtos.length === 1 ? "resultado encontrado" : "resultados encontrados"}`
        : "";

        results.innerHTML = produtos.length
        ? `<div class="grid-2">${produtos.map((p, i) => cardHtml(p, i)).join("")}</div>`
        : emptyHtml(q);

    } catch (err) {
        console.error("Erro na pesquisa:", err);
        results.innerHTML = `<p style="color:var(--muted-fg)">Erro ao buscar. Tente novamente.</p>`;
    }
}

// ─── Eventos ──────────────────────────────────────────────────────────────────

form.addEventListener("submit", e => {
  e.preventDefault();
  const q = input.value;
  // Atualiza a URL sem recarregar a página
  history.replaceState(null, "", `?pesquisa=${encodeURIComponent(q)}`);
  buscar(q);
});

// ─── Inicialização ────────────────────────────────────────────────────────────

// Se veio query pela URL (ex: vindo do header), preenche o input e já busca
if (queryInicial) {
  input.value = queryInicial;
  buscar(queryInicial);
}