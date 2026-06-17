
const BASE_URL = 'http://localhost:8080/v1/sorvetudos/admin';
let token = localStorage.getItem('token')


function formatarBRL(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


function criarIconeTrocar() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
    <path d="M17 2l4 4-4 4"/>
    <path d="M3 11V9a4 4 0 014-4h14"/>
    <path d="M7 22l-4-4 4-4"/>
    <path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>`;
}

function preencherCards(produtos, categorias, ingredientes) {
  document.getElementById('total-produtos').textContent    = produtos.length;
  document.getElementById('total-categorias').textContent  = categorias.length;
  document.getElementById('total-ingredientes').textContent = ingredientes.length;
}


function criarCategorias(categorias) {
  if (!categorias || categorias.length === 0) return '—';
  return categorias.map(c => `<span class="categoria">${c.categoria}</span>`).join('');
}

function criarTags(tags) {
  if (!tags || tags.length === 0) return '—';
  return tags.map(t => `<span class="categoria">${t.tag}</span>`).join('');
}


function criarLinhaProdutos(produto) {
  const tr = document.createElement('tr');
  tr.dataset.id = produto.id;

  const statusLabel = produto.status ? 'Ativo' : 'Inativo';
  const statusClass = produto.status ? 'ativo' : 'inativo';


  tr.innerHTML = `
    <td>
      <span class="produto-nome-link" data-id="${produto.id}">${produto.nome}</span>
    </td>
    <td>${criarCategorias(produto.categoria) }</td>
    <td>${formatarBRL(produto.preco)}</td>
    <td>${ criarTags(produto.tag )}</td>
    <td>
      <div class="status-cell">
        <span class="status-badge ${statusClass}">${statusLabel}</span>
        <button
          class="btn-toggle"
          title="Alterar status"
          aria-label="Alterar status de ${produto.nome}"
          data-id="${produto.id}"
        >${criarIconeTrocar()}</button>
      </div>
    </td>
  `;
  return tr;
}


function renderizarTabela(lista) {
  const tbody      = document.getElementById('products-tbody');
  const emptyState = document.getElementById('empty-state');

  tbody.innerHTML = '';

  if (lista.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  lista.forEach(p => tbody.appendChild(criarLinhaProdutos(p)));
}

async function toggleStatus(id, lista) {
  const produto = lista.find(p => p.id === id);
  if (!produto) return;

  let novoStatus = 1

  if (produto.status === 1)
    novoStatus = '0'

  try {
    let formData = criarFormData(produto, novoStatus)
    console.log(formData.get('img'))
  
    const OPTIONS = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        },
      body: formData,
    }

    console.log(formData.get('status'))

    let res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS);
    let data = await res.json()
    console.log(data)

    // Atualiza localmente sem re-buscar tudo
    produto.status = novoStatus;

    const tr    = document.querySelector(`tr[data-id="${id}"]`);
    const badge = tr?.querySelector('.status-badge');
    if (badge) {
      badge.textContent = novoStatus ? 'Ativo' : 'Inativo';
      badge.className   = `status-badge ${novoStatus ? 'ativo' : 'inativo'}`;
    }
  } catch (err) {
    console.error('Erro ao alterar status:', err);
  }
}

const criarFormData = (produto, novoStatus) =>{
  const formData = new FormData();
  let preco = produto.preco
  let img = produto.img
  let sabor = produto.sabor.map(s => s.id)
  let categoria = produto.categoria.map(c => c.id) 
  let ingrediente = produto.ingrediente.map(i => i.id) 
  let tamanho = produto.tamanho.map(t => t.id)
  let tag = produto.tag.map(t => t.id) 

  formData.append("nome",      produto.nome);
  formData.append("descricao", produto.descricao);
  formData.append("preco",     Number(preco));
  formData.append("img",       produto.img);
  formData.append('status',   Number(novoStatus));

  formData.append("sabor",       JSON.stringify(sabor.map(id => ({ id }))));
  formData.append("categoria",   JSON.stringify(categoria.map(id =>( {id}  ))));
  formData.append("ingrediente", JSON.stringify(ingrediente.map(id => ({ id }))));
  formData.append("tag",         JSON.stringify(tag.map(id => ({ id }))));
  formData.append("tamanho",     JSON.stringify(tamanho.map(id => ({ id }))));
  formData.append("promocao",    JSON.stringify([{ id: 1 }]));
  formData.append("lote",        JSON.stringify([{ id: 1 }]));

  return formData
}


function navegarParaProduto(id) {
  window.location.href = `visualizar-produto.html?id=${id}`;
}


async function pegarProdutos() {

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  const res = await fetch(`${BASE_URL}/produtos`, OPTIONS);
  let data = await res.json()
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return data.response.produto;
}

async function pegarCategorias() {
  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }
  const res = await fetch(`${BASE_URL}/categorias`, OPTIONS);
  let data = await res.json()
  if (!res.ok) throw new Error('Erro ao buscar categorias');
  return data.response.categoria;
}

async function pegarIngredientes() {
  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }
  const res = await fetch(`${BASE_URL}/ingredientes`, OPTIONS);
  let data = await res.json()
  if (!res.ok) throw new Error('Erro ao buscar ingredientes');
  return data.response.ingrediente;
}

function bindBusca(lista) {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    const termo = input.value.toLowerCase().trim();
    const filtrado = lista.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    renderizarTabela(filtrado);
    // rebinda eventos após re-render
    bindEventosTabela(lista);
  });
}


function bindEventosTabela(lista) {
  const tbody = document.getElementById('products-tbody');

  tbody.addEventListener('click', (e) => {
    // Clique no toggle de status
    const btnToggle = e.target.closest('.btn-toggle');
    if (btnToggle) {
      toggleStatus(Number(btnToggle.dataset.id), lista);
      return;
    }

    // Clique no nome do produto → visualizar
    const linkNome = e.target.closest('.produto-nome-link');
    if (linkNome) {
      navegarParaProduto(Number(linkNome.dataset.id));
    }
  });
}


async function init() {
  try {
    const [produtos, categorias, ingredientes] = await Promise.all([
      pegarProdutos(),
      pegarCategorias(),
      pegarIngredientes()
    ]);

    preencherCards(produtos, categorias, ingredientes);
    renderizarTabela(produtos);
    bindBusca(produtos);
    bindEventosTabela(produtos);

  } catch (err) {
    console.error('Erro ao inicializar dashboard:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);