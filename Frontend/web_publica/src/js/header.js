//Função que renderiza o header, ela é acionada automaticamente ao arquivo ser carregado
(function () {

    const inPagesFolder = window.location.pathname.includes("/src/pages/");
    const basePath = inPagesFolder ? "../../" : "./";

  //Esse array carrega todas as informações dos links na nav
    //href = indica para onde o link vai ao ser clicado
    //label = texto que está sendo escrito no menu
    //icon = imagem do link de navegação
    //anchor = define se o link tem uma ancora específica 
  const NAV = [
    { href: `${basePath}index.html`, label: "Início", icon: `<img src='${basePath}src/img/icons/home.svg'>`, anchor: null },
    { href: `${basePath}index.html#sabores`, label: "Sabores", icon: `<img src='${basePath}src/img/icons/sabores.svg'>`, anchor: "sabores" },
    { href: `${basePath}index.html#destaques`, label: "Destaques", icon: `<img src='${basePath}src/img/icons/destaques.svg'>`, anchor: "destaques" },
    { href: `${basePath}index.html#milkshakes`, label: "Milkshakes", icon: `<img src='${basePath}src/img/icons/milkshakes.svg'>`, anchor: "milkshakes" },
    { href: `${basePath}index.html#contato`, label: "Contato", icon: `<img src='${basePath}src/img/icons/contato.svg'>`, anchor: "contato" }
  ];

  //Pega o nome da pagina atual de acordo com a url
    //o .split() transforma a string em um array usando "/" como separador
    //o .pop() pega o ultimo elemento do array
  const path = location.pathname.split("/").pop() || "index.html";

  
  //Função que retorna a logo do sorvetudos no header
  function logoHtml(size) {
    //utiliza operador ternário para identificar a classe que a logo vai ter (logo-lg ou logo)
    const classe = size === "lg" ? "logo logo-lg" : "logo";
    return `<a href="${basePath}index.html" class="${classe}" aria-label="Sorvetudos">
      <img src="${basePath}src/img/logo/sorvetudos-logo.png" alt="Sorvetudos">
      <span>Sorvetudos<em>.</em></span>
    </a>`;
  }

  
  //função que retorna a lista de menus de navegação colocando o index como ativo (corrigir depois para que ele identifique os outros menus como ativo também)
  function navList() {
    return NAV.map(n => {
      const active = !n.anchor && './'+path === n.href ? "active" : "";
      return `<a href="${n.href}" class="${active}"><span>${n.icon}</span>${n.label}</a>`;
    }).join("");
  }

  //variavel que cria o html do header 
  const html = `
    <!-- Mobile topbar -->
    <div class="topbar">
      <div class="topbar-inner">
        ${logoHtml()}
        <button id="menu-toggle" aria-label="menu">☰</button>
      </div>
      <div class="topbar-menu" id="topbar-menu">
        <form id="topbar-search">
          <input name="pesquisa" placeholder="Buscar sabores…" autocomplete="off">
        </form>
        <nav>${navList()}</nav>
      </div>
    </div>

    <!-- Desktop sidebar -->
    <aside class="sidebar">
      ${logoHtml()}
      <form class="sidebar-search" id="sidebar-search">
        <input name="pesquisa" placeholder="Buscar sabor…" autocomplete="off">
      </form>
      <nav class="sidebar-nav">
        <span class="label">Navegar</span>
        ${navList()}
      </nav>
      <div class="sidebar-foot">
        <p>Feito em São Paulo<br>com leite fresco da fazenda.</p>
      </div>
    </aside>
  `;

  const montarHeader = document.getElementById("header-container");
  if (montarHeader) montarHeader.innerHTML = html;

  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("topbar-menu");

  //adiciona a classe open ao menu de mobile ao clicar nele
  if (toggle && menu) toggle.addEventListener("click", () => menu.classList.toggle("open"));

  //
  ["sidebar-search", "topbar-search"].forEach(id => {
    //tenta achar os ids "sidebar-search" ou "topbar-search" no document
    const form = document.getElementById(id);
    if (!form) return;

    //se achar o formulario ele adiciona um evento de submit
    form.addEventListener("submit", event => {
      //evita a pagina reiniciar
      event.preventDefault();

      //cria uma variavel que pega o valor da pesquisa
        //o new FormData pega a variavel formulario e retorna os dados dela
        //o .get pega o valor referenciado ao nome do input
      const valorPesquisa = new FormData(form).get("pesquisa") || "";

      //manda para pagina de pesquisa enviando o valorPesquisa na url codificada, de forma que não quebre a url
      location.href = `${basePath}src/pages/search.html?pesquisa=` + encodeURIComponent(valorPesquisa);
    });
  });
})();
