import { pegarCategorias } from "./main.js";
import { pegarTags } from "./main.js";
import { pegarSabores } from "./main.js";
import { pegarTamanhos } from "./main.js";
import { pegarIngredientes } from "./main.js";

function criarChip(id, label, tipo = "checkbox", grupo = "") {
  const chip = document.createElement("label");
  chip.className = "chip";

  const name = tipo === "radio" ? `data-grupo="${grupo}"` : "";

  chip.innerHTML = `
    <input type="${tipo}" value="${id}" data-label="${label}" ${tipo === "radio" ? `name="${grupo}"` : ""} />
    <span class="chip-toggle"></span>
    <span class="chip-label">${label}</span>
  `;
  return chip;
}

export const  renderizarCategorias = async () =>{
  const container = document.getElementById("categorias-chips");
  const data = await pegarCategorias()
  const CATEGORIAS =  data.response.categoria
  if (!container || !CATEGORIAS) return;
  container.innerHTML = "";
  CATEGORIAS.forEach((c) =>
    container.appendChild(criarChip(c.id, c.categoria))
  );
}

export const renderizarTags= async () => {
  const container = document.getElementById("tags-chips");
  const data = await pegarTags()
  const TAGS = data.response.tag
  if (!container) return;
  container.innerHTML = "";
  TAGS.forEach((t) => container.appendChild(criarChip(t.id, t.tag)));
}

export const renderizarSabores = async () => {
  const container = document.getElementById("sabores-chips");
  const data = await pegarSabores()
  const SABORES = data.response.sabor
  if (!container) return;
  container.innerHTML = "";
  SABORES.forEach((s) => container.appendChild(criarChip(s.id, s.sabor)));
}

export const renderizarTamanhos = async () => {
  const container = document.getElementById("tamanhos-chips");
  const data = await pegarTamanhos()
  const TAMANHOS = data.response.tamanho
  if (!container) return;
  container.innerHTML = "";

  TAMANHOS.forEach((t) =>
    container.appendChild(criarChip(t.id, t.tamanho, "radio", "tamanho"))
  );
}

export const renderizarIngredientes = async () => {
  const container = document.getElementById("ingredientes-chips");
  const data = await pegarIngredientes()
  const INGREDIENTES = data.response.ingrediente
  if (!container) return;
  container.innerHTML = "";
  INGREDIENTES.forEach((i) =>
    container.appendChild(criarChip(i.id, i.ingrediente))
  );
}

export function renderizarTudo() {
  renderizarCategorias();
  renderizarTags();
  renderizarSabores();
  renderizarTamanhos();
  renderizarIngredientes();
}
