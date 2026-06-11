(function () {
  //guarda a quantidade de cards por "pagina"
  const PAGE_SIZE = 6;
  //guarda as categorias registradas
  const CATEGORIAS = ["Todos", ...window.categorias];
  //guarda o preço de cada produto
  const precos = window.PRODUTOS.map(p => p.preco);
  //guarda o o menos preço dentre todos os produtos
  const PRICE_MIN = Math.floor(Math.min(...precos));
  //guarda o preço maximo de todos os produtos
  const PRICE_MAX = Math.ceil(Math.max(...precos));

  //guarda o estado atual de todos os atributos que podem modificar conforme o usuário altere os filtros 
  const state = {
    cat: "Todos", query: "", priceMax: PRICE_MAX,
    sizes: [], onlyPromo: false, visible: PAGE_SIZE, showFilters: false
  };

  //cria o card de um produto
    //a variavel "i" é o indice do array do produto a ser renderizado, esse indice é utilizado no delay da animação para 
    //dar o movimento em cadeia da animação
  function productCardHtml(produto, i) {
    return `<a href="./src/pages/product.html?id=${produto.id}" class="product-card" style="animation-delay:${i*50}ms">
      <div class="product-img">
        <img src="${'./src' + produto.img}" alt="${escapeHtml(produto.nome)}" loading="lazy">
        ${produto.tags.forEach((tag) =>{
            tag ? `<span class="product-tag">${escapeHtml(tag)}</span>` : ""
        })}
      </div>
      <div class="product-info">
        <div class="meta"><span>${escapeHtml(produto.categorias[0].nome)}</span></div>
        <h3>${escapeHtml(produto.nome)}</h3>
        <p>${escapeHtml(produto.sabores[0].sabor)}</p>
      </div>
      <div class="product-price">
        <span>${formatarPreco(produto.preco)}</span>
      </div>
      <div class="product-price-mobile">${formatarPreco(produto.preco)}</div>
    </a>`;
  }

  function render() {
    //renderiza as categorias 
    document.getElementById("categoria-catalogo").innerHTML = CATEGORIAS.map(categoria =>
      `<button class="cat-pill ${state.cat===categoria.categoria?"active":""}" data-cat="${categoria.categoria}">${categoria.categoria}</button>`
    ).join("");

    const produtos = window.PRODUTOS

    //mostra os produtos no grid de id = "catalog-grid"
      //a variavel show é responsavel por pegar os produtos que estão entre o indice 0 até o número do page-size, nesse caso 6
    const shown = produtos.slice(0, state.visible);
    const grid = document.getElementById("catalog-grid");

    //se o shown não achar nenhum produto aparece "Nenhum sabor encontrado" 
      //se o shown achar um produto ele manda o produto e o indice dele no array
        //o join transforma tudo em uma string unica
    grid.innerHTML = shown.length === 0
      ? `<div class="empty" style="grid-column:1/-1"><div class="icon">🍨</div><p>Nenhum sabor encontrado.</p></div>`
      : shown.map((produto, i) => productCardHtml(produto, i)).join("");

    //Controla a visibilidade do botão de ver mais, se o state.visable for menor do que o tamanho do array de produtos, o display
    //do botão de ver mais e flex, se não, é none
    const seeMore = document.getElementById("see-more");
    seeMore.style.display = state.visible < produtos.length ? "flex" : "none";

    //Controla a visibilidade do painel de filtros
    const panel = document.getElementById("filters-panel");
    panel.classList.toggle("open", state.showFilters);

    //essa variavel identifica quantos filtros estão sendo utilizados
      //se a categoria for igual a "Todos", então nenhum filtro de categoria está sendo usado, se for "Cremosos" então 1 está sendo usado
        //ele faz isso para todos os filtros e soma todos
    const activeCount =
      (state.cat !== "Todos" ? 1 : 0) +
      (state.query ? 1 : 0) +
      (state.priceMax < PRICE_MAX ? 1 : 0) +
      (state.sizes.length > 0 ? 1 : 0) +
      (state.onlyPromo ? 1 : 0);


    const btnFiltro = document.getElementById("filters-btn");

    //o toggle funciona basicamente como:
    //   if (state.showFilters) {
    //   fb.classList.add("active");
    // } else {
    //   fb.classList.remove("active");
    // }
    btnFiltro.classList.toggle("active", state.showFilters);

    //coloca o número de filtros sendo utilizado no contador de filtro dentro do html
    document.getElementById("filters-badge").innerHTML = activeCount > 0 ? activeCount : "";
    //muda o display do contator de filtros do html de acordo com o activeCount
    document.getElementById("filters-badge").style.display = activeCount > 0 ? "inline-grid" : "none";


    document.getElementById("price-value").textContent = "R$ " + state.priceMax;

    //identifica quantos produtos foram encontrados após os filtros serem habilitados e adiciona no contador de produtos filtrados
    document.getElementById("filter-count").textContent =
      produtos.length + " " + (produtos.length === 1 ? "sabor encontrado" : "sabores encontrados");

    //pega todos os botões de tamanho e verifica se estão selecionados para o controle da classe "active"
    document.querySelectorAll(".size-btn").forEach(b => {
      b.classList.toggle("active", state.sizes.includes(b.dataset.size));
    });
  }

  //Renderiza o painel de filtros
  document.getElementById("filters-panel").innerHTML = `
    <div class="filters-grid">
      <div>
        <div class="filter-row">
          <p class="filter-l">Preço máx.</p>
          <span class="filter-v" id="price-value">R$ ${PRICE_MAX}</span>
        </div>
        <input type="range" class="range" id="range-price" min="${PRICE_MIN}" max="${PRICE_MAX}" step="1" value="${PRICE_MAX}">
        <div class="filter-minmax"><span>R$ ${PRICE_MIN}</span><span>R$ ${PRICE_MAX}</span></div>
      </div>
      <div>
        <p class="filter-l">Tamanho</p>
        <div class="size-btns">
          ${window.SIZES.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join("")}
        </div>
        <p class="filter-minmax" style="margin-top:12px">P · 90ml · M · 180ml · G · 320ml</p>
      </div>
      <div>
        <p class="filter-l">Promoção</p>
        <label class="promo-toggle">
          <input type="checkbox" id="only-promo">
          <span class="promo-switch"><span class="track"></span><span class="knob"></span></span>
          <span style="font-size:14px">Só itens em promoção</span>
        </label>
        <p class="filter-minmax" style="margin-top:12px">Descontos aplicados diariamente nos sabores da estação.</p>
      </div>
    </div>
    <div class="filters-foot">
      <p class="info" id="filter-count"></p>
      <button class="btn-link" id="reset-filters">✕ Limpar filtros</button>
    </div>
  `;

  //Trigga os eventos acionados nos elementos de categoria, pesquisa, painel de filtro, range de preço, tamanho do sorvete,   
  //apenas produtos em promoção, resetar filtros e ver mais
    //DEPOIS NO LUGAR DE CHAMAR O RENDER NO FINAL, CHAMAR O HANDLER QUE FAZ A REQUISIÇÃO DE FILTROS

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

  document.getElementById("range-price").addEventListener("input", e => {
    state.priceMax = Number(e.target.value); 
    state.visible = PAGE_SIZE; 
    render();
  });

  document.querySelectorAll(".size-btn").forEach(b => {
    b.addEventListener("click", () => {
      const s = b.dataset.size;
      state.sizes = state.sizes.includes(s) ? state.sizes.filter(x => x !== s) : [...state.sizes, s];
      state.visible = PAGE_SIZE; 
      render();
    });
  });

  document.getElementById("only-promo").addEventListener("change", e => {
    state.onlyPromo = e.target.checked; 
    state.visible = PAGE_SIZE; 
    render();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    state.cat = "Todos"; state.query = ""; state.priceMax = PRICE_MAX;
    state.sizes = []; state.onlyPromo = false; state.visible = PAGE_SIZE;
    document.getElementById("catalog-search").value = "";
    document.getElementById("range-price").value = PRICE_MAX;
    document.getElementById("only-promo").checked = false;
    render();
  });
  
  document.getElementById("see-more").addEventListener("click", () => {
    state.visible += PAGE_SIZE; 
    render();
  });

  render();
})();
