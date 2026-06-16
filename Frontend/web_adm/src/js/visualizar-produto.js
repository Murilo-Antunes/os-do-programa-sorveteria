const BASE_URL = 'http://localhost:8080/v1/sorvetudos/admin';
const token = localStorage.getItem('token')

// ------------------------------------------------------------
//  Pega o ID da URL  (?id=3)
// ------------------------------------------------------------
function pegarIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// ------------------------------------------------------------
//  Busca o produto na API
// ------------------------------------------------------------
async function pegarProduto(id) {
    const OPTIONS = {
        headers: {
            'x-access-token': token,
        },
    }
    const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS);
    if (!res.ok) throw new Error(`Produto ${id} não encontrado`);
    const data = await res.json()
    return data.response.produto[0];
}

// ------------------------------------------------------------
//  Helpers de renderização
// ------------------------------------------------------------
function criarChipLeitura(texto) {
  return `<span class="chip-leitura">${texto}</span>`;
}

function renderizarChips(container, itens, chave) {
  if (!itens || itens.length === 0) {
    container.innerHTML = '<span class="sem-dados">—</span>';
    return;
  }
  container.innerHTML = itens.map(i => criarChipLeitura(i[chave])).join('');
}

// ------------------------------------------------------------
//  Preenche todos os campos da página com os dados do produto
// ------------------------------------------------------------
function preencherPagina(produto) {
    console.log(produto)
  // Título
  document.querySelector('.pagina-titulo').textContent = produto.nome;
  document.title = `Sorvetudos — ${produto.nome}`;

  // Imagem
  const img = document.getElementById('produto-imagem');
  if (produto.img) {
    img.src = produto.img;
    img.style.display = 'block';
    document.getElementById('imagem-placeholder').style.display = 'none';
  }

  // Campos de texto
  document.getElementById('campo-nome').value     = produto.nome        ?? '';
  document.getElementById('campo-sabor').value    = produto.sabores?.[0]?.sabor ?? '';
  document.getElementById('campo-preco').value    = produto.preco       ?? '';
  document.getElementById('campo-tag').value      = produto.tags?.[0]?.nome ?? produto.tags?.[0]?.tag ?? '';
  document.getElementById('campo-descricao').value = produto.descricao  ?? '';

  // Chips de categorias e ingredientes
  renderizarChips(
    document.getElementById('categorias-lista'),
    produto.categorias,
    'nome'
  );
  renderizarChips(
    document.getElementById('ingredientes-lista'),
    produto.ingredientes,
    'ingrediente'
  );
}

// ------------------------------------------------------------
//  Modal de deletar
// ------------------------------------------------------------
function abrirModalDeletar(produto) {
  const overlay = document.getElementById('modal-overlay');
  const titulo  = document.getElementById('modal-titulo');
  const msg     = document.getElementById('modal-mensagem');

  titulo.textContent = 'Deletar Produto';
  msg.textContent    = `Deseja deletar o produto [${produto.nome}]?`;

  overlay.classList.add('ativo');

  document.getElementById('modal-btn-voltar').onclick = fecharModal;
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
            'x-access-token': token,
        },
    }
    const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS);

    if (!res.ok) throw new Error('Erro ao deletar produto');

    // Volta ao dashboard após deletar
    window.location.href = 'dashboard_modelo.html';
  } catch (err) {
    console.error(err);
    alert('Erro ao deletar o produto. Tente novamente.');
  }
}

// ------------------------------------------------------------
//  Navega para a página de edição
// ------------------------------------------------------------
function navegarParaEditar(id) {
  window.location.href = `editar-produto.html?id=${id}`;
}

// ------------------------------------------------------------
//  Init
// ------------------------------------------------------------
async function init() {
  const id = pegarIdDaUrl();

  if (!id) {
    window.location.href = 'dashboard_modelo.html';
    return;
  }

  try {
    const produto = await pegarProduto(id);

    preencherPagina(produto);

    document.getElementById('btn-deletar').addEventListener('click', () => {
      abrirModalDeletar(produto);
    });

    document.getElementById('btn-editar').addEventListener('click', () => {
      navegarParaEditar(id);
    });

  } catch (err) {
    console.error(err);
    alert('Não foi possível carregar o produto.');
    window.location.href = 'dashboard_modelo.html';
  }
}

document.addEventListener('DOMContentLoaded', init);