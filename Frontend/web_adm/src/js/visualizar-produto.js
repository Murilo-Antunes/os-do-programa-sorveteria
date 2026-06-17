const BASE_URL = 'http://localhost:8080/v1/sorvetudos/admin';
let token = localStorage.getItem('token')

function pegarIdDaUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

async function pegarProduto(id) {
  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }
  const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS);
  console.log(res)
  
  if (!res.ok) throw new Error(`Produto ${id} não encontrado`);
  const data = await res.json()
  return data.response.produto;
}

function criarChipLeitura(texto) {
  const span = document.createElement('span');
  span.className   = 'chip-leitura';
  span.textContent = texto;
  return span;
}

function renderizarChipsLeitura(containerId, itens, chave) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (!itens || itens.length === 0) {
    container.innerHTML = '<span class="sem-dados">—</span>';
    return;
  }

  itens.forEach(item => container.appendChild(criarChipLeitura(item[chave])));
}
function preencherPagina(produtoArray) {
  let produto = produtoArray[0]
  console.log(produto)
  // Título
  document.querySelector('.pagina-titulo').textContent = produto.nome;
  document.title = `Sorvetudos — ${produto.nome}`;

  // Imagem
  if (produto.img) {
    const img = document.getElementById('produto-imagem');
    img.src = produto.img;
    img.style.display = 'block';
    document.getElementById('imagem-placeholder').style.display = 'none';
  }

  // Campos de texto
  document.getElementById('campo-nome').value      = produto.nome      ?? '';
  document.getElementById('campo-preco').value     = produto.preco     ?? '';
  document.getElementById('campo-descricao').value = produto.descricao ?? '';

  // Chips — usando as chaves SINGULARES que a API retorna
  renderizarChipsLeitura('sabores-lista',     produto.sabor,      'sabor');
  renderizarChipsLeitura('tags-lista',        produto.tag,        'tag');
  renderizarChipsLeitura('categorias-lista',  produto.categoria,  'categoria');
  renderizarChipsLeitura('tamanhos-lista',    produto.tamanho,    'tamanho');
  renderizarChipsLeitura('ingredientes-lista',produto.ingrediente,'ingrediente');
}

function abrirModalDeletar(produtoArray) {
  let produto = produtoArray[0]
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-mensagem').textContent =
    `Deseja deletar o produto [${produto.nome}]?`;

  overlay.classList.add('ativo');

  document.getElementById('modal-btn-voltar').onclick  = fecharModal;
  document.getElementById('modal-btn-deletar').onclick = () => confirmarDeletar(produto.id);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharModal();
  });
}

function fecharModal() {
  document.getElementById('modal-overlay').classList.remove('ativo');
}

async function confirmarDeletar(id) {
  try {
    const OPTIONS = {
      method: 'DELETE',
      headers: {
          'x-access-token': token
      }
    }
    const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS);
    if (!res.ok) throw new Error('Erro ao deletar produto');
    window.location.href = 'dashboard_modelo.html';
  } catch (err) {
    console.error(err);
    alert('Erro ao deletar o produto. Tente novamente.');
  }
}

async function init() {
  const id = pegarIdDaUrl();
  if (!id) { window.location.href = 'dashboard_modelo.html'; return; }

  try {
    const produto = await pegarProduto(id);
    preencherPagina(produto);

    document.getElementById('btn-deletar').addEventListener('click', () => abrirModalDeletar(produto));
    document.getElementById('btn-editar').addEventListener('click',  () => {
      window.location.href = `editar-produto.html?id=${id}`;
    });
    document.getElementById('modal-fechar').addEventListener('click', fecharModal);

  } catch (err) {
    console.error(err);
    alert('Não foi possível carregar o produto.');
  }
}

document.addEventListener('DOMContentLoaded', init);