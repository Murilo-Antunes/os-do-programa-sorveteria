(function () {
  const montarFooter = document.getElementById("footer-container");
  const inPagesFolder = window.location.pathname.includes("/src/pages/");
  const basePath = inPagesFolder ? "../../" : "./";
  montarFooter.innerHTML = `
    <footer id="contato">
      <div class="grid">
        <div>
          <p class="label">Sobre nós</p>
          <h3>Pequenas porções de <em>felicidade</em>, todos os dias.</h3>
          <p class="desc">Sorvetudos é a sorveteria artesanal que adoça o seu dia com sabores cremosos, feitos diariamente em São Paulo com leite fresco da fazenda e ingredientes selecionados.</p>
        </div>
        <div>
          <p class="label">Explorar</p>
          <ul>
            <li><a href="${basePath}index.html#sabores">Sabores</a></li>
            <li><a href="${basePath}index.html#destaques">Destaques</a></li>
            <li><a href="${basePath}index.html#milkshakes">Milkshakes</a></li>
            <li><a href="${basePath}index.html#sundaes">Sundaes</a></li>
            <li><a href="#">Nossas lojas</a></li>
          </ul>
        </div>
        <div>
          <p class="label">Contato</p>
          <ul class="contact-list">
            <li><span class="ic"><img src="${basePath}src/img/icons/email.svg"></span><a href="mailto:osdoprograma@sorvetudos.com.br">osdoprograma@sorvetudos.com.br</a></li>
            <li><span class="ic"><img src="${basePath}src/img/icons/telefone.svg"></span><span>+55 11 4002 8922</span></li>
            <li><span class="ic"><img src="${basePath}src/img/icons/localizacao.svg"></span><span>R. das Flores, 123<br>Vila Madalena · São Paulo</span></li>
          </ul>
        </div>
      </div>
      <div class="copy">
        <span>© 2026 Sorvetudos Sorveteria. Todos os direitos reservados.</span>
      </div>
    </footer>
  `;
})();
