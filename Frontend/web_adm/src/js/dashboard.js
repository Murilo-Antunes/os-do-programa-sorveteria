const PRODUTOS = [
  {
    "id": 1,
    "nome": "Milkshake de Chocolate Belga Supremo",
    "descricao": "Cremoso milkshake batido com autêntico chocolate belga e finalizado com uma generosa camada de chantilly.",
    "preco": 24.90,
    "status": true,
    "quantidade": 10,
    "tamanho": "M",
    "img": "/img/assets/ice-acai.jpg",
    "categorias": [
      { "id": 3, "nome": "Milkshakes" },
      { "id": 0, "nome": "Cremosos" }
    ],
    "sabores": [
      { "id": 0, "sabor": "chocolate" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 2, "ingrediente": "Chocolate belga" },
      { "id": 12, "ingrediente": "Chantilly" }
    ],
    "tags": [
      { "id": 1, "sabor": "Mais vendido" }
    ]
  },
  {
    "id": 2,
    "nome": "Gelato de Pistache Siciliano Premium",
    "descricao": "Gelato artesanal feito com pistache importado da Sicília, textura aveludada e sabor marcante.",
    "preco": 18.50,
    "status": true,
    "quantidade": 25,
    "tamanho": "P",
    "img": "/img/assets/ice-chocolate.jpg",
    "categorias": [
      { "id": 2, "nome": "Nuts" },
      { "id": 0, "nome": "Cremosos" }
    ],
    "sabores": [
      { "id": 2, "sabor": "pistache" }
    ],
    "ingredientes": [
      { "id": 1, "ingrediente": "Creme de leite" },
      { "id": 4, "ingrediente": "Pistache siciliano" }
    ],
    "tags": [
      { "id": 0, "sabor": "Em Alta" },
      { "id": 2, "sabor": "Sucesso" }
    ]
  },
  {
    "id": 3,
    "nome": "Sorvete de Morango Silvestre",
    "descricao": "Sorvete refrescante feito com morangos silvestres colhidos na estação, sem corantes artificiais.",
    "preco": 12.90,
    "status": true,
    "quantidade": 10,
    "tamanho": "P",
    "img": "/img/assets/ice-morango.jpg",
    "categorias": [
      { "id": 1, "nome": "Frutas" }
    ],
    "sabores": [
      { "id": 3, "sabor": "morango" }
    ],
    "ingredientes": [
      { "id": 8, "ingrediente": "Frutas vermelhas" },
      { "id": 13, "ingrediente": "Açúcar orgânico" }
    ],
    "tags": []
  },
  {
    "id": 4,
    "nome": "Sorvete de Chocolate ao Leite",
    "descricao": "Clássico sorvete cremoso de chocolate ao leite, perfeito para qualquer ocasião.",
    "preco": 13.90,
    "status": true,
    "quantidade": 25,
    "tamanho": "M",
    "img": "/img/assets/ice-chocolate.jpg",
    "categorias": [
      { "id": 5, "nome": "Clássicos" }
    ],
    "sabores": [
      { "id": 0, "sabor": "chocolate" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 2, "ingrediente": "Chocolate belga" }
    ],
    "tags": []
  },
  {
    "id": 5,
    "nome": "Sorvete de Pistache Importado",
    "descricao": "Sorvete artesanal de pistache com textura refinada e sabor intenso.",
    "preco": 16.90,
    "status": false,
    "quantidade": 2,
    "tamanho": "P",
    "img": "/img/assets/ice-pistache.jpg",
    "categorias": [
      { "id": 2, "nome": "Nuts" }
    ],
    "sabores": [
      { "id": 2, "sabor": "pistache" }
    ],
    "ingredientes": [
      { "id": 1, "ingrediente": "Creme de leite" },
      { "id": 4, "ingrediente": "Pistache siciliano" }
    ],
    "tags": []
  },
  {
    "id": 6,
    "nome": "Açaí com Granola Crocante",
    "descricao": "Bowl de açaí puro com granola artesanal crocante e um fio de mel.",
    "preco": 19.90,
    "status": false,
    "quantidade": 0,
    "tamanho": "G",
    "img": "/img/assets/ice-acai.jpg",
    "categorias": [
      { "id": 1, "nome": "Frutas" }
    ],
    "sabores": [
      { "id": 4, "sabor": "açaí" }
    ],
    "ingredientes": [
      { "id": 9, "ingrediente": "Açaí" },
      { "id": 11, "ingrediente": "Granola crocante" }
    ],
    "tags": []
  }
];

const CATEGORIAS = [
  { "id": 0, "categoria": "Cremosos" },
  { "id": 1, "categoria": "Frutas" },
  { "id": 2, "categoria": "Nuts" },
  { "id": 3, "categoria": "Milkshakes" },
  { "id": 4, "categoria": "Sundaes" },
  { "id": 5, "categoria": "Clássicos" }
];

const INGREDIENTES = [
  { "id": 0,  "ingrediente": "Leite integral" },
  { "id": 1,  "ingrediente": "Creme de leite" },
  { "id": 2,  "ingrediente": "Chocolate belga" },
  { "id": 3,  "ingrediente": "Baunilha de Madagascar" },
  { "id": 4,  "ingrediente": "Pistache siciliano" },
  { "id": 5,  "ingrediente": "Cookies" },
  { "id": 6,  "ingrediente": "Caramelo salgado" },
  { "id": 7,  "ingrediente": "Doce de leite" },
  { "id": 8,  "ingrediente": "Frutas vermelhas" },
  { "id": 9,  "ingrediente": "Açaí" },
  { "id": 10, "ingrediente": "Menta fresca" },
  { "id": 11, "ingrediente": "Granola crocante" },
  { "id": 12, "ingrediente": "Chantilly" },
  { "id": 13, "ingrediente": "Açúcar orgânico" }
];

//Formata o preço para o padrão brasileiro
function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

//cria o svg de mudar status
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


//Atualiza os três cards de resumo no topo do dashboard.
function preencherCards() {
  document.getElementById('total-produtos').textContent   = PRODUTOS.length;
  document.getElementById('total-categorias').textContent = CATEGORIAS.length;
  document.getElementById('total-ingredientes').textContent  = INGREDIENTES.length;
}

//Retorna um span contendo uma categoria
function criarCategorias(categorias) {
  if (!categorias || categorias.length === 0) return '—';
  return categorias.map(c => `<span class="categoria">${c.nome}</span>`).join('');
}

//Cria uma linha para a tabela
function criarLinhaProdutos(produto) {
  const tr = document.createElement('tr');
  //o dataset coloca um id na tr com o mesmo id do produto para que seja possivel identifica-lo depois
  tr.dataset.id = produto.id;

  const statusLabel = produto.status ? 'Ativo' : 'Inativo';
  const statusClass = produto.status ? 'ativo' : 'inativo';

  tr.innerHTML = `
    <td>${produto.nome}</td>
    <td>${criarCategorias(produto.categorias)}</td>
    <td>${formatarBRL(produto.preco)}</td>
    <td class="col-qty">${produto.quantidade}</td>
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

function renderTable(lista) {
  const tbody      = document.getElementById('products-tbody');
  const emptyState = document.getElementById('empty-state');

  tbody.innerHTML = '';
  if (lista.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  lista.forEach(produto => {
    const tr = criarLinhaProdutos(produto);
    tbody.appendChild(tr);
  });
}


// TOGGLE DE STATUS
function toggleStatus(id) {
  const produto = PRODUTOS.find(p => p.id === id);
  if (!produto) return;

  produto.status = !produto.status;

  // Atualiza apenas a célula de status da linha correspondente
  const tr = document.querySelector(`tr[data-id="${id}"]`);
  if (!tr) return;

  const badge  = tr.querySelector('.status-badge');
  const label  = produto.status ? 'Ativo' : 'Inativo';
  const classe    = produto.status ? 'ativo' : 'inativo';

  badge.textContent = label;
  badge.className   = `status-badge ${classe}`;
}

// EVENTOS
function bindToggleButtons() {
  const tbody = document.getElementById('products-tbody');

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-toggle');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    toggleStatus(id);
  });
}

// INICIALIZAÇÃO
function init() {
  preencherCards();
  renderTable(PRODUTOS);
  bindToggleButtons();
}

document.addEventListener('DOMContentLoaded', init);
