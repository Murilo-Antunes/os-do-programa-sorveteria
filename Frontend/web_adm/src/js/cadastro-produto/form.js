import { obterImagem } from "./upload.js";
import { cadastrarProduto } from "./main.js";

export function iniciarForm() {
  const btnCadastrar = document.getElementById("btn-cadastrar");
  if (!btnCadastrar) return;
  let formData = btnCadastrar.addEventListener("click", chamarCadastro);
}

function _obterSelecionadosIds(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(
    container.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked')
  ).map((cb) => Number(cb.value));
  
}

const validarProduto = () => {
  // --- Campos de texto ---
  const nome      = document.getElementById("input-nome").value.trim();

  const descricao = document.getElementById("input-descricao").value.trim();
  const preco     = document.getElementById("input-preco").value.trim();

  // --- Seleções ---
  const categorias  = _obterSelecionadosIds("categorias-chips");
  const sabores     = _obterSelecionadosIds("sabores-chips");
  const ingredientes = _obterSelecionadosIds("ingredientes-chips");
  const tags        = _obterSelecionadosIds("tags-chips");
  const tamanhos    = _obterSelecionadosIds("tamanhos-chips"); // radio → máx 1

  // --- Imagem ---
  const imagem = obterImagem(); // vem do upload.js


  // --- Validação ---
  const erros = [];
  if (!nome)              erros.push("Nome do produto é obrigatório.");
  if (!descricao)         erros.push("Descrição é obrigatória.");
  if (!preco || isNaN(Number(preco))) erros.push("Preço válido é obrigatório.");
  if (categorias.length === 0)  erros.push("Selecione ao menos uma categoria.");
  if (sabores.length === 0)     erros.push("Selecione ao menos um sabor.");
  if (ingredientes.length === 0) erros.push("Selecione ao menos um ingrediente.");
  if (tamanhos.length === 0)    erros.push("Selecione um tamanho.");
  if (!imagem)                  erros.push("Selecione uma imagem para o produto.");

  if (erros.length > 0) {
    alert("Corrija os seguintes campos:\n\n" + erros.map((e) => `• ${e}`).join("\n"));
    return false;
  }
  return true
}

const _submeterProduto = ()  =>{

  // --- Campos de texto ---
  const nome      = document.getElementById("input-nome").value.trim();

  const descricao = document.getElementById("input-descricao").value.trim();
  const preco     = document.getElementById("input-preco").value.trim();

  // --- Seleções ---
  const categorias  = _obterSelecionadosIds("categorias-chips");
  const sabores     = _obterSelecionadosIds("sabores-chips");
  const ingredientes = _obterSelecionadosIds("ingredientes-chips");
  const tags        = _obterSelecionadosIds("tags-chips");
  const tamanhos    = _obterSelecionadosIds("tamanhos-chips"); // radio → máx 1

  // --- Imagem ---
  const imagem = obterImagem(); // vem do upload.js

  const formData = new FormData();

  formData.append("nome",      nome);
  formData.append("descricao", descricao);
  formData.append("preco",     Number(preco));
  formData.append("status",    1)
  formData.append("img",       imagem);

  formData.append("categoria",   JSON.stringify(categorias.map(id => ({ id }))));
  formData.append("sabor",       JSON.stringify(sabores.map(id => ({ id }))));
  formData.append("ingrediente", JSON.stringify(ingredientes.map(id => ({ id }))));
  formData.append("tag",         JSON.stringify(tags.map(id => ({ id }))));
  formData.append("tamanho",     JSON.stringify(tamanhos.map(id => ({ id }))));
  formData.append("promocao",    JSON.stringify([{ id: 1 }]));
  formData.append("lote",        JSON.stringify([{ id: 1 }]));

  return formData
}

const chamarCadastro = async () => {
  let validar = validarProduto()
  if(!validar) return
  let formData = _submeterProduto()
  cadastrarProduto(formData)
}