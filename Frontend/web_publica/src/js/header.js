//Função que renderiza o header, ela é acionada automaticamente ao arquivo ser carregado
(function () {

    const inPagesFolder = window.location.pathname.includes("/src/pages/");
    const basePath = inPagesFolder ? "../../" : "./";

  const NAV = [
    { href: `${basePath}index.html#home`, label: "Início", icon: `<img src='${basePath}src/img/icons/home.svg'>`, anchor: "home" },
    { href: `${basePath}index.html#destaques`, label: "Destaques", icon: `<img src='${basePath}src/img/icons/destaques.svg'>`, anchor: "destaques" },
    { href: `${basePath}index.html#sabores`, label: "Sabores", icon: `<img src='${basePath}src/img/icons/sabores.svg'>`, anchor: "sabores" },
    { href: `${basePath}index.html#milkshakes`, label: "Milkshakes", icon: `<img src='${basePath}src/img/icons/milkshakes.svg'>`, anchor: "milkshakes" },
    { href: `${basePath}index.html#contato`, label: "Contato", icon: `<img src='${basePath}src/img/icons/contato.svg'>`, anchor: "contato" }
  ];

  const path = location.pathname.split("/").pop() || "index.html";

  function logoHtml(size) {
    const classe = size === "lg" ? "logo logo-lg" : "logo";
    return `<a href="${basePath}index.html" class="${classe}" aria-label="Sorvetudos">
      <img src="${basePath}src/img/logo/sorvetudos-logo.png" alt="Sorvetudos">
      <span>Sorvetudos<em>.</em></span>
    </a>`;
  }

  function getCurrentAnchor() {
    return location.hash ? location.hash.slice(1) : "home";
  }

  function isActive(n) {
    if (n.anchor) return getCurrentAnchor() === n.anchor;
    return './' + path === n.href;
  }

  function navList() {
    return NAV.map(n => {
      const active = isActive(n) ? "active" : "";
      return `<a href="${n.href}" class="${active}" data-anchor="${n.anchor || ""}"><span>${n.icon}</span>${n.label}</a>`;
    }).join("");
  }

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

  if (toggle && menu) toggle.addEventListener("click", () => menu.classList.toggle("open"));

  // --- Ativação do link (clique e hash) ---
  const navLinks = document.querySelectorAll(".topbar-menu nav a, .sidebar-nav a");

  function setActiveLink(anchor) {
    navLinks.forEach(a => {
      a.classList.toggle("active", a.dataset.anchor === anchor);
    });
  }

  navLinks.forEach(a => {
    a.addEventListener("click", () => {
      const anchor = a.dataset.anchor;
      if (!anchor) return;
      setActiveLink(anchor);
      if (menu) menu.classList.remove("open");
    });
  });

  window.addEventListener("hashchange", () => setActiveLink(getCurrentAnchor()));

  // --- Ativação do link conforme o scroll (scroll spy) ---
  function initScrollSpy() {
    //Busca as seções correspondentes a cada ancora do NAV, ignorando as que não existem nessa página
    const sections = NAV
      .filter(n => n.anchor)
      .map(n => document.getElementById(n.anchor))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        //só ativa quando a seção está cruzando a faixa central da tela
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, {
      rootMargin: "-40% 0px -55% 0px", //faixa "gatilho" no centro da viewport
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }

  initScrollSpy();

  ["sidebar-search", "topbar-search"].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;

    form.addEventListener("submit", event => {
      event.preventDefault();
      const valorPesquisa = new FormData(form).get("pesquisa") || "";
      location.href = `${basePath}src/pages/search.html?pesquisa=` + encodeURIComponent(valorPesquisa);
    });
  });
})();