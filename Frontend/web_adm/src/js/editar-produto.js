// ============================================================
//  editar-produto.js
//  Carrega produto por ID, pré-preenche todos os campos,
//  e envia PUT com multipart/form-data ao confirmar.
// ============================================================

const BASE_URL = 'http://localhost:8080/v1/sorvetudos/admin';

let produtoAtual = null;
let imagemNova   = null;

let token = localStorage.getItem('token')

const OPTIONS_GET = {
    headers: {
            'x-access-token': token,
    },
}

// ------------------------------------------------------------
//  URL helpers
// ------------------------------------------------------------
function pegarIdDaUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

// ------------------------------------------------------------
//  Busca da API
// ------------------------------------------------------------
async function pegarProduto(id) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS_GET);
  if (!res.ok) throw new Error('Produto não encontrado');
  let data = await res.json()
  return data.response.produto[0];
}

async function pegarCategorias() {
    const res = await fetch(`${BASE_URL}/categorias`, OPTIONS_GET);
    if (!res.ok) throw new Error('Erro ao buscar categorias');
    let data = await res.json()
    return data.response.categoria;
}

async function pegarIngredientes() {
    const res = await fetch(`${BASE_URL}/ingredientes`, OPTIONS_GET);
    if (!res.ok) throw new Error('Erro ao buscar ingredientes');
    let data = await res.json()
    return data.response.ingrediente;
}

async function pegarTags() {
    const res = await fetch(`${BASE_URL}/tags`, OPTIONS_GET);
    if (!res.ok) throw new Error('Erro ao buscar tags');
    let data = await res.json()
    return data.response.tag;
}

async function pegarTamanhos() {
    const res = await fetch(`${BASE_URL}/tamanhos`, OPTIONS_GET);
    if (!res.ok) throw new Error('Erro ao buscar tamanhos');
    let data = await res.json()
    return data.response.tamanhos;
}

async function pegarSabores() {
    const res = await fetch(`${BASE_URL}/sabores`, OPTIONS_GET);
    if (!res.ok) throw new Error('Erro ao buscar sabores');
    let data = await res.json()
    return data.response.sabor;
}

// ------------------------------------------------------------
//  Cria chip (checkbox ou radio) pré-selecionável
// ------------------------------------------------------------
function criarChip(id, label, tipo, grupo, selecionado = false) {
  const chip = document.createElement('label');
  chip.className = 'chip';

  const input = document.createElement('input');
  input.type  = tipo;
  input.value = id;
  input.dataset.label = label;
  if (tipo === 'radio') input.name = grupo;
  if (selecionado) input.checked = true;

  const toggle = document.createElement('span');
  toggle.className = 'chip-toggle';

  const texto = document.createElement('span');
  texto.className   = 'chip-label';
  texto.textContent = label;

  chip.appendChild(input);
  chip.appendChild(toggle);
  chip.appendChild(texto);
  return chip;
}

// ------------------------------------------------------------
//  Renderiza lista de chips com pré-seleção baseada no produto
// ------------------------------------------------------------
function renderizarChipsEdicao(containerId, itens, chave, idsSelecionados, tipo = 'checkbox', grupo = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  itens.forEach(item => {
    const selecionado = idsSelecionados.includes(item.id);
    container.appendChild(criarChip(item.id, item[chave], tipo, grupo, selecionado));
  });
}

// ------------------------------------------------------------
//  Preenche campos de texto e imagem
// ------------------------------------------------------------
function preencherCampos(produto) {
    console.log(produto)
  document.querySelector('.pagina-titulo').textContent = `Editar ${produto.nome}`;
  document.title = `Sorvetudos — Editar ${produto.nome}`;

  document.getElementById('campo-nome').value      = produto.nome        ?? '';
  document.getElementById('campo-sabor').value     = produto.sabores?.[0]?.sabor ?? '';
  document.getElementById('campo-preco').value     = produto.preco       ?? '';
  document.getElementById('campo-tag').value       = produto.tags?.[0]?.nome ?? produto.tags?.[0]?.tag ?? '';
  document.getElementById('campo-descricao').value = produto.descricao   ?? '';

  // Imagem existente como preview de fundo
  if (produto.img) {
    const area = document.getElementById('dropzone');
    area.style.backgroundImage  = `url('${produto.img}')`;
    area.style.backgroundSize   = 'cover';
    area.style.backgroundPosition = 'center';
  }
}

// ------------------------------------------------------------
//  Upload de imagem
// ------------------------------------------------------------
function iniciarUpload() {
  const dropzone    = document.getElementById('dropzone');
  const inputArquivo = document.getElementById('input-arquivo');
  const placeholder = document.getElementById('upload-placeholder');

  dropzone.addEventListener('click', () => inputArquivo.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-sobre');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-sobre'));

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-sobre');
    const arquivo = e.dataTransfer.files[0];
    if (arquivo?.type.startsWith('image/')) _processarArquivo(arquivo, placeholder);
  });

  inputArquivo.addEventListener('change', () => {
    if (inputArquivo.files[0]) _processarArquivo(inputArquivo.files[0], placeholder);
  });
}

function _processarArquivo(arquivo, placeholder) {
  imagemNova = arquivo;
  const leitor = new FileReader();
  leitor.onload = (e) => {
    const dropzone = document.getElementById('dropzone');
    dropzone.style.backgroundImage    = `url('${e.target.result}')`;
    dropzone.style.backgroundSize     = 'cover';
    dropzone.style.backgroundPosition = 'center';
    if (placeholder) placeholder.style.display = 'none';
  };
  leitor.readAsDataURL(arquivo);
}

// ------------------------------------------------------------
//  Pega IDs selecionados nos chips
// ------------------------------------------------------------
function obterSelecionadosIds(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(
    container.querySelectorAll('input:checked')
  ).map(cb => Number(cb.value));
}

// ------------------------------------------------------------
//  Submit — PUT com FormData
// ------------------------------------------------------------
async function submeterEdicao(id) {
  const nome      = document.getElementById('campo-nome').value.trim();
  const descricao = document.getElementById('campo-descricao').value.trim();
  const preco     = document.getElementById('campo-preco').value.trim();

  const categorias   = obterSelecionadosIds('categorias-chips');
  const ingredientes = obterSelecionadosIds('ingredientes-chips');

  if (!nome || !preco) {
    alert('Nome e Preço são obrigatórios.');
    return;
  }

  // Monta FormData — mesmo contrato do cadastro (multipart/form-data)
  const formData = new FormData();
  formData.append('nome',        nome);
  formData.append('descricao',   descricao);
  formData.append('preco',       Number(preco));
  formData.append('status',      produtoAtual.status);
  formData.append('categorias',  JSON.stringify(categorias));
  formData.append('ingredientes', JSON.stringify(ingredientes));
  formData.append('sabores',     JSON.stringify(produtoAtual.sabores?.map(s => s.id) ?? []));
  formData.append('tags',        JSON.stringify(produtoAtual.tags?.map(t => t.id) ?? []));
  formData.append('tamanhos',    JSON.stringify(produtoAtual.tamanhos?.map(t => t.id) ?? []));
  formData.append('promocoes',   JSON.stringify([]));
  formData.append('lote',        JSON.stringify([]));

  // Só envia imagem se o usuário trocou
  if (imagemNova) formData.append('img', imagemNova);

  try {
    const OPTIONS_PUT = {
        method: 'PUT',
        headers: {
            'x-access-token': token,
        },
        body: formData
    }
    const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS_PUT);

    if (!res.ok) throw new Error('Erro ao atualizar produto');

    window.location.href = `visualizar-produto.html?id=${id}`;
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar alterações. Tente novamente.');
  }
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
    const [produto, categorias, ingredientes] = await Promise.all([
      pegarProduto(id),
      pegarCategorias(),
      pegarIngredientes(),
    ]);

    produtoAtual = produto;

    preencherCampos(produto);

    // IDs já associados ao produto
    const idsCategoriasSel   = produto.categorias?.map(c => c.id) ?? [];
    const idsIngredientesSel = produto.ingredientes?.map(i => i.id) ?? [];

    renderizarChipsEdicao('categorias-chips',   categorias,   'categoria',   idsCategoriasSel);
    renderizarChipsEdicao('ingredientes-chips', ingredientes, 'ingrediente', idsIngredientesSel);

    iniciarUpload();

    document.getElementById('btn-confirmar').addEventListener('click', () => submeterEdicao(id));

  } catch (err) {
    console.error(err);
    alert('Não foi possível carregar o produto para edição.');
  }
}

document.addEventListener('DOMContentLoaded', init);