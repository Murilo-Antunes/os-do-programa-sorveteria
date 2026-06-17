const links = document.querySelectorAll('.sidebar-nave li a');
const paginaAtual = window.location.pathname.split('/').pop();

links.forEach(link => {
  const hrefLink = link.getAttribute('href').split('/').pop();
  if (hrefLink === paginaAtual) {
    link.classList.add('active');
  }
});

