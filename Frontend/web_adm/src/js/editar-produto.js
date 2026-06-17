const BASE_URL = 'http://localhost:8080/v1/sorvetudos/admin';
let token = localStorage.getItem('token')
const OPTIONS_GET = {
  headers: {
      'x-access-token': token,
    },
}
let produtoAtual = null;
let imagemNova   = null;

function pegarIdDaUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

async function pegarProduto(id) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, OPTIONS_GET);
  if (!res.ok) throw new Error('Produto não encontrado',);
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
  return data.response.tamanho;
}

async function pegarSabores() {
  const res = await fetch(`${BASE_URL}/sabores`, OPTIONS_GET);
  if (!res.ok) throw new Error('Erro ao buscar sabores');
  let data = await res.json()
  return data.response.sabor;
}


function criarChip(id, label, tipo, grupo, selecionado = false) {
  const chip = document.createElement('label');
  chip.className = 'chip';

  const input = document.createElement('input');
  input.type          = tipo;
  input.value         = id;
  input.dataset.label = label;
  if (tipo === 'radio') input.name = grupo;
  if (selecionado)      input.checked = true;

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

function renderizarChipsEdicao(containerId, itens, chave, idsSelecionados, tipo = 'checkbox', grupo = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  itens.forEach(item => {
    const selecionado = idsSelecionados.includes(item.id);
    container.appendChild(criarChip(item.id, item[chave], tipo, grupo, selecionado));
  });
}

function preencherCampos(produto) {
  document.querySelector('.pagina-titulo').textContent = `Editar ${produto.nome}`;
  document.title = `Sorvetudos — Editar ${produto.nome}`;

  document.getElementById('campo-nome').value      = produto.nome      ?? '';
  document.getElementById('campo-preco').value     = produto.preco     ?? '';
  document.getElementById('campo-descricao').value = produto.descricao ?? '';

  if (produto.img) {
    const dropzone = document.getElementById('dropzone');
    dropzone.style.backgroundImage    = `url('${produto.img}')`;
    dropzone.style.backgroundSize     = 'cover';
    dropzone.style.backgroundPosition = 'center';
    document.getElementById('upload-placeholder').style.display = 'none';
  }
}

function iniciarUpload() {
  const dropzone     = document.getElementById('dropzone');
  const inputArquivo = document.getElementById('input-arquivo');
  const placeholder  = document.getElementById('upload-placeholder');

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

function obterSelecionadosIds(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('input:checked'))
    .map(cb => Number(cb.value));
}

const validarProduto = () => {

  const nome      = document.getElementById('campo-nome').value.trim();
  const descricao = document.getElementById('campo-descricao').value.trim();
  const preco     = document.getElementById('campo-preco').value.trim();

  const categorias  = obterSelecionadosIds("categorias-chips");
  const sabores     = obterSelecionadosIds("sabores-chips");
  const ingredientes = obterSelecionadosIds("ingredientes-chips");
  const tags        = obterSelecionadosIds("tags-chips");
  const tamanhos    = obterSelecionadosIds("tamanhos-chips"); 

  const erros = [];
  if (!nome)              erros.push("Nome do produto é obrigatório.");
  if (!descricao)         erros.push("Descrição é obrigatória.");
  if (!preco || isNaN(Number(preco))) erros.push("Preço válido é obrigatório.");
  if (categorias.length === 0)  erros.push("Selecione ao menos uma categoria.");
  if (sabores.length === 0)     erros.push("Selecione ao menos um sabor.");
  if (ingredientes.length === 0) erros.push("Selecione ao menos um ingrediente.");
  if (tamanhos.length === 0)    erros.push("Selecione um tamanho.");

  if (erros.length > 0) {
    alert("Corrija os seguintes campos:\n\n" + erros.map((e) => `• ${e}`).join("\n"));
    return false;
  }
  return true
}


async function submeterEdicao(id) {
  let validacao = validarProduto()
  if(!validacao) return;

  const nome      = document.getElementById('campo-nome').value.trim();
  const descricao = document.getElementById('campo-descricao').value.trim();
  const preco     = document.getElementById('campo-preco').value.trim();

  if (!nome || !preco) {
    alert('Nome e Preço são obrigatórios.');
    return;
  }

  const categorias   = obterSelecionadosIds('categorias-chips');
  const sabores      = obterSelecionadosIds('sabores-chips');
  const tags         = obterSelecionadosIds('tags-chips');
  const tamanhos     = obterSelecionadosIds('tamanhos-chips');
  const ingredientes = obterSelecionadosIds('ingredientes-chips');

  const formData = new FormData();
  formData.append('nome',         nome);
  formData.append('descricao',    descricao);
  formData.append('preco',        Number(preco));
  formData.append('status',       Number(produtoAtual.status));
  formData.append('categoria',    JSON.stringify(categorias.map(id => ({id}))));
  formData.append('sabor',       JSON.stringify(sabores.map(id => ({id}))));
  formData.append('tag',          JSON.stringify(tags.map(id => ({id}))));
  formData.append('tamanho',      JSON.stringify(tamanhos.map(id => ({id}))));
  formData.append('ingrediente',  JSON.stringify(ingredientes.map(id => ({id}))));
  formData.append('promocao',     JSON.stringify([{ id: 1 }]));
  formData.append('lote',         JSON.stringify([{ id: 1 }]));

  if (imagemNova) {
    formData.append('img', imagemNova);
  }  else{
    formData.append('img', produtoAtual.img);
  }
  console.log(formData.get('status'))

  try {
    const res = await fetch(`${BASE_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        },
      body: formData,
    });

    if (!res.ok) throw new Error('Erro ao atualizar produto');

    window.location.href = `visualizar-produto.html?id=${id}`;
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar alterações. Tente novamente.');
  }
}

async function init() {
  const id = pegarIdDaUrl();
  if (!id) { window.location.href = 'dashboard_modelo.html'; return; }

  try {
    const [produto, categorias, sabores, tags, tamanhos, ingredientes] = await Promise.all([
      pegarProduto(id),
      pegarCategorias(),
      pegarSabores(),
      pegarTags(),
      pegarTamanhos(),
      pegarIngredientes(),
    ]);

    produtoAtual = produto;
    preencherCampos(produto);

    const idsCategorias   = (produto.categoria   ?? []).map(c => c.id);
    const idsSabores      = (produto.sabor        ?? []).map(s => s.id);
    const idsTags         = (produto.tag          ?? []).map(t => t.id);
    const idsTamanhos     = (produto.tamanho      ?? []).map(t => t.id);
    const idsIngredientes = (produto.ingrediente  ?? []).map(i => i.id);

    renderizarChipsEdicao('categorias-chips',   categorias,   'categoria',   idsCategorias);
    renderizarChipsEdicao('sabores-chips',      sabores,      'sabor',       idsSabores);
    renderizarChipsEdicao('tags-chips',         tags,         'tag',         idsTags);
    renderizarChipsEdicao('tamanhos-chips',     tamanhos,     'tamanho',     idsTamanhos,  'radio', 'tamanho');
    renderizarChipsEdicao('ingredientes-chips', ingredientes, 'ingrediente', idsIngredientes);

    iniciarUpload();

    document.getElementById('btn-confirmar')
      .addEventListener('click', () => submeterEdicao(id));

  } catch (err) {
    console.error(err);
    alert('Não foi possível carregar o produto para edição.');
  }
}

document.addEventListener('DOMContentLoaded', init);