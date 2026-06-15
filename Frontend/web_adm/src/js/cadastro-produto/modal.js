// --- CATEGORIA ---
const btnDeletarCategoria = document.querySelector('[aria-label = "Deletar categoria"]')
const btnAdicionarCategoria = document.querySelector('[aria-label = "Adicionar categoria"]')
const btnEditarCategoria = document.querySelector('[aria-label = "Editar categoria"]')

// --- SABOR ---
const btnDeletarSabor = document.querySelector('[aria-label = "Deletar sabor"]')
const btnAdicionarSabor = document.querySelector('[aria-label = "Adicionar sabor"]')
const btnEditarSabor = document.querySelector('[aria-label = "Editar sabor"]')

// --- TAG ---
const btnDeletarTag = document.querySelector('[aria-label = "Deletar tag"]')
const btnAdicionarTag = document.querySelector('[aria-label = "Adicionar tag"]')
const btnEditarTag = document.querySelector('[aria-label = "Editar tag"]')

// --- TAMANHO ---
const btnDeletarTamanho = document.querySelector('[aria-label = "Deletar tamanho"]')
const btnAdicionarTamanho = document.querySelector('[aria-label = "Adicionar tamanho"]')
const btnEditarTamanho = document.querySelector('[aria-label = "Editar tamanho"]')

// --- INGREDIENTE ---
const btnDeletarIngrediente = document.querySelector('[aria-label = "Deletar ingrediente"]')
const btnAdicionarIngrediente = document.querySelector('[aria-label = "Adicionar ingrediente"]')
const btnEditarIngrediente = document.querySelector('[aria-label = "Editar ingrediente"]')

//Renders
import { BASE_URL, CATEGORIAS } from "./main.js";
import { renderizarCategorias } from "./renderizar.js"
import { renderizarIngredientes } from "./renderizar.js"
import { renderizarSabores } from "./renderizar.js"
import { renderizarTags } from "./renderizar.js"
import { renderizarTamanhos } from "./renderizar.js"

let token = localStorage.getItem('token')

function obterSelecionados(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(
    container.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked')
  ).map((cb) => ({ id: Number(cb.value), label: cb.dataset.label }));
}

function proximoId(array) {
  return array.length > 0 ? Math.max(...array.map((x) => x.id)) + 1 : 1;
}

//  Motor do modal
function abrirModal(html) {
  const overlay = document.getElementById("modal-overlay");
  const caixa   = document.getElementById("modal-caixa");
  caixa.innerHTML = html;
  overlay.classList.add("ativo");

  const btnFechar = caixa.querySelector(".modal-fechar");
  if (btnFechar) btnFechar.addEventListener("click", fecharModal);

  // Fechar ao clicar fora
  overlay.addEventListener("click", _fecharFora);
}

function _fecharFora(e) {
  if (e.target === document.getElementById("modal-overlay")) {
    fecharModal();
  }
}

function fecharModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("ativo");
  overlay.removeEventListener("click", _fecharFora);
}

//  Template base dos modais
function _modalFormulario({ titulo, labelCampo, placeholder, valorInicial = "", textoBotao, aoConfirmar }) {
  abrirModal(`
    <button class="modal-fechar" aria-label="Fechar">✕</button>
    <h2 class="modal-titulo">${titulo}</h2>
    <div class="modal-corpo">
      <label class="campo-label">${labelCampo}</label>
      <input id="modal-input" class="campo-input" type="text"
             placeholder="${placeholder}" value="${valorInicial}" />
    </div>
    <div class="modal-rodape">
      <button class="btn-acao btn-confirmar" id="modal-btn-confirmar">${textoBotao}</button>
    </div>
  `);
  document.getElementById("modal-btn-confirmar").addEventListener("click", aoConfirmar);
  // Confirmar com Enter
  document.getElementById("modal-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") aoConfirmar();
  });
}

function _modalConfirmacao({ titulo, mensagem, aoConfirmar }) {
  abrirModal(`
    <button class="modal-fechar" aria-label="Fechar">✕</button>
    <h2 class="modal-titulo">${titulo}</h2>
    <div class="modal-corpo modal-corpo--confirmar">
      <p class="texto-confirmar">${mensagem}</p>
    </div>
    <div class="modal-rodape modal-rodape--dois">
      <button class="btn-acao btn-perigo" id="modal-btn-deletar">deletar</button>
      <button class="btn-acao btn-secundario" id="modal-btn-voltar">voltar</button>
    </div>
  `);

  document.getElementById("modal-btn-deletar").addEventListener("click", aoConfirmar);
  document.getElementById("modal-btn-voltar").addEventListener("click", fecharModal);
}


//  CATEGORIAS
function modalAdicionarCategoria() {
  _modalFormulario({
    titulo:       "Nova Categoria",
    labelCampo:   "Nome da Categoria",
    placeholder:  "EX: Cremosos",
    textoBotao:   "CADASTRAR CATEGORIA",
    aoConfirmar:  _confirmarAdicionarCategoria,
  });
}

const _confirmarAdicionarCategoria = async () => {
  let valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da categoria.");

  let categoria = {
    "categoria" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(categoria)   
  }

  let response = await fetch(`${BASE_URL}/categorias`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova categoria')

  renderizarCategorias();
  fecharModal();
}

function modalEditarCategoria() {
  let sel = obterSelecionados("categorias-chips");

  if (sel.length === 0) return alert("Selecione uma categoria para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  let item = sel[0];
  _modalFormulario({
    titulo:        "Editar Categoria",
    labelCampo:    "Nome da Categoria",
    placeholder:   "EX: Cremosos",
    valorInicial:  item.label,
    textoBotao:    "EDITAR CATEGORIA",
    aoConfirmar:   () => _confirmarEditarCategoria(item.id),
  });
}

const _confirmarEditarCategoria = async (id) => {
  let valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da categoria.");

    let categoria = {
    "categoria" : valor
  }
  
  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(categoria)   
  }

  let response = await fetch(`${BASE_URL}/categorias/${id}`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova categoria')

  renderizarCategorias();
  fecharModal();
}

function modalDeletarCategoria() {
  let sel = obterSelecionados("categorias-chips");
  if (sel.length === 0) return alert("Selecione ao menos uma categoria para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Categoria",
    mensagem:    `Deseja deletar ${sel.length} categoria(s)?`,
    aoConfirmar: () => _confirmarDeletarCategoria(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarCategoria = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  await Promise.all(
    ids.map((id) => fetch(`${BASE_URL}/categorias/${id}`, OPTIONS))
  );
  renderizarCategorias();
  fecharModal();
}

//  TAGS
function modalAdicionarTag() {
  _modalFormulario({
    titulo:      "Nova Tag",
    labelCampo:  "Nome da Tag",
    placeholder: "EX: Em Alta",
    textoBotao:  "CADASTRAR TAG",
    aoConfirmar: _confirmarAdicionarTag,
  });
}

const _confirmarAdicionarTag = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da tag.");
  
  let tag = {
    "tag" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tag)   
  }

  let response = await fetch(`${BASE_URL}/tags`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova tag')

  renderizarTags();
  fecharModal();
}

function modalEditarTag() {
  const sel = obterSelecionados("tags-chips");
  if (sel.length === 0) return alert("Selecione uma tag para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Tag",
    labelCampo:   "Nome da Tag",
    placeholder:  "EX: Em Alta",
    valorInicial: item.label,
    textoBotao:   "EDITAR TAG",
    aoConfirmar:  () => _confirmarEditarTag(item.id),
  });
}

const _confirmarEditarTag = async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da tag.");

  let tag = {
    "tag" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tag)   
  }

  let response = await fetch(`${BASE_URL}/tags/${id}`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova tag')

  renderizarTags();
  fecharModal();
}

function modalDeletarTag() {
  const sel = obterSelecionados("tags-chips");
  if (sel.length === 0) return alert("Selecione ao menos uma tag para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Tag",
    mensagem:    `Deseja deletar ${sel.length} tag(s)?`,
    aoConfirmar: () => _confirmarDeletarTag(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarTag = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  await Promise.all(
    ids.map((id) => fetch(`${BASE_URL}/tags/${id}`, OPTIONS))
  );

  renderizarTags();
  fecharModal();
}

//  SABORES
function modalAdicionarSabor() {
  _modalFormulario({
    titulo:      "Novo Sabor",
    labelCampo:  "Nome do Sabor",
    placeholder: "EX: Chocolate Premium",
    textoBotao:  "CADASTRAR SABOR",
    aoConfirmar: _confirmarAdicionarSabor,
  });
}

const _confirmarAdicionarSabor = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do sabor.");

  let sabor = {
    "sabor" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(sabor)   
  }

  let response = await fetch(`${BASE_URL}/sabores`, OPTIONS)
  if(!response) throw new Error ('Erro a criar um novo sabor')

  renderizarSabores();
  fecharModal();
}

function modalEditarSabor() {
  const sel = obterSelecionados("sabores-chips");
  if (sel.length === 0) return alert("Selecione um sabor para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Sabor",
    labelCampo:   "Nome do Sabor",
    placeholder:  "EX: Chocolate Premium",
    valorInicial: item.label,
    textoBotao:   "EDITAR SABOR",
    aoConfirmar:  () => _confirmarEditarSabor(item.id),
  });
}

const _confirmarEditarSabor= async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do sabor.");
  
  let sabor = {
    "sabor" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(sabor)   
  }

  let response = await fetch(`${BASE_URL}/sabores/${id}`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova sabor')

  renderizarSabores();
  fecharModal();
}

function modalDeletarSabor() {
  const sel = obterSelecionados("sabores-chips");
  if (sel.length === 0) return alert("Selecione ao menos um sabor para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Sabor",
    mensagem:    `Deseja deletar ${sel.length} sabor(es)?`,
    aoConfirmar: () => _confirmarDeletarSabor(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarSabor = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  await Promise.all(
    ids.map((id) => fetch(`${BASE_URL}/sabores/${id}`, OPTIONS))
  );
  renderizarSabores();
  fecharModal();
}

//  TAMANHOS

function modalAdicionarTamanho() {
  _modalFormulario({
    titulo:      "Novo Tamanho",
    labelCampo:  "Nome do Tamanho",
    placeholder: "EX: G",
    textoBotao:  "CADASTRAR TAMANHO",
    aoConfirmar: _confirmarAdicionarTamanho,
  });
}

const _confirmarAdicionarTamanho = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o tamanho.");
  let tamanho = {
    "tamanho" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tamanho)   
  }

  let response = await fetch(`${BASE_URL}/tamanhos`, OPTIONS)
  if(!response) throw new Error ('Erro a criar um novo tamanho')
  renderizarTamanhos();
  fecharModal();
}

function modalEditarTamanho() {
  const sel = obterSelecionados("tamanhos-chips");
  if (sel.length === 0) return alert("Selecione um tamanho para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Tamanho",
    labelCampo:   "Nome do Tamanho",
    placeholder:  "EX: G",
    valorInicial: item.label,
    textoBotao:   "EDITAR TAMANHO",
    aoConfirmar:  () => _confirmarEditarTamanho(item.id),
  });
}

const _confirmarEditarTamanho = async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o tamanho.");

  let tamanho = {
    "tamanho" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tamanho)   
  }

  let response = await fetch(`${BASE_URL}/tamanhos/${id}`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova tamanho')

  renderizarTamanhos();
  fecharModal();
}

function modalDeletarTamanho() {
  const sel = obterSelecionados("tamanhos-chips");
  if (sel.length === 0) return alert("Selecione ao menos um tamanho para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Tamanho",
    mensagem:    `Deseja deletar ${sel.length} tamanho(s)?`,
    aoConfirmar: () => _confirmarDeletarTamanho(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarTamanho = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  await Promise.all(
    ids.map((id) => fetch(`${BASE_URL}/tamanhos/${id}`, OPTIONS))
  );

  renderizarTamanhos();
  fecharModal();
}

//  INGREDIENTES
function modalAdicionarIngrediente() {
  _modalFormulario({
    titulo:      "Novo Ingrediente",
    labelCampo:  "Nome do Ingrediente",
    placeholder: "EX: Leite integral",
    textoBotao:  "CADASTRAR INGREDIENTE",
    aoConfirmar: _confirmarAdicionarIngrediente,
  });
}

const _confirmarAdicionarIngrediente = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do ingrediente.");

  let ingrediente = {
    "ingrediente" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(ingrediente)   
  }

  let response = await fetch(`${BASE_URL}/ingredientes`, OPTIONS)
  if(!response) throw new Error ('Erro a criar um novo ingrediente')
  renderizarIngredientes();
  fecharModal();
}

function modalEditarIngrediente() {
  const sel = obterSelecionados("ingredientes-chips");
  if (sel.length === 0) return alert("Selecione um ingrediente para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Ingrediente",
    labelCampo:   "Nome do Ingrediente",
    placeholder:  "EX: Leite integral",
    valorInicial: item.label,
    textoBotao:   "EDITAR INGREDIENTE",
    aoConfirmar:  () => _confirmarEditarIngrediente(item.id),
  });
}

const _confirmarEditarIngrediente = async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do ingrediente.");
  
  let ingrediente = {
    "ingrediente" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(ingrediente)   
  }

  let response = await fetch(`${BASE_URL}/ingredientes/${id}`, OPTIONS)
  if(!response) throw new Error ('Erro a criar uma nova ingrediente')
  renderizarIngredientes();
  fecharModal();
}

function modalDeletarIngrediente() {
  const sel = obterSelecionados("ingredientes-chips");
  if (sel.length === 0) return alert("Selecione ao menos um ingrediente para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Ingrediente",
    mensagem:    `Deseja deletar ${sel.length} ingrediente(s)?`,
    aoConfirmar: () => _confirmarDeletarIngrediente(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarIngrediente = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  await Promise.all(
    ids.map((id) => fetch(`${BASE_URL}/ingredientes/${id}`, OPTIONS))
  );

  renderizarIngredientes();
  fecharModal();
}

// EVENTOS
btnDeletarCategoria.addEventListener('click', modalDeletarCategoria)
btnAdicionarCategoria.addEventListener('click', modalAdicionarCategoria)
btnEditarCategoria.addEventListener('click', modalEditarCategoria)

btnDeletarSabor.addEventListener('click', modalDeletarSabor)
btnAdicionarSabor.addEventListener('click', modalAdicionarSabor)
btnEditarSabor.addEventListener('click', modalEditarSabor)

btnDeletarTag.addEventListener('click', modalDeletarTag)
btnAdicionarTag.addEventListener('click', modalAdicionarTag)
btnEditarTag.addEventListener('click', modalEditarTag)

btnDeletarTamanho.addEventListener('click', modalDeletarTamanho)
btnAdicionarTamanho.addEventListener('click', modalAdicionarTamanho)
btnEditarTamanho.addEventListener('click', modalEditarTamanho)

btnDeletarIngrediente.addEventListener('click', modalDeletarIngrediente)
btnAdicionarIngrediente.addEventListener('click', modalAdicionarIngrediente)
btnEditarIngrediente.addEventListener('click', modalEditarIngrediente)