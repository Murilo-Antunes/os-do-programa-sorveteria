import { getAllUsuarios, putByIdUsuario } from "./usuarios.js";

//Cria uma linha para a tabela
function criarLinhaUsuarios(usuario) {
  const tr = document.createElement('tr');
  //o dataset coloca um id na tr com o mesmo id do usuario para que seja possivel identifica-lo depois
  tr.dataset.id = usuario.id;

  const statusLabel = usuario.status ? 'Ativo' : 'Inativo';
  const statusClass = usuario.status ? 'ativo' : 'inativo';

  tr.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.nivel_de_acesso}</td>
    <td>
      <div class="button-container">
        <button
          class="btn-remover"
          title="remover"
          aria-label="Excluir usuário: ${usuario.nome}"
          data-id="${usuario.id}"
        >Excluir</button>

        <button
          class="btn-editar"
          title="editar"
          aria-label="Editar usuário: ${usuario.nome}"
          data-id="${usuario.id}"
          onclick = ""
        >Editar</button>
      </div>
    </td>
  `;
  return tr;
}

function renderTable(lista) {
  const tbody      = document.getElementById('users-tbody');
  const emptyState = document.getElementById('empty-state');

  tbody.innerHTML = '';
  if (lista.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  lista.forEach(usuario => {
    const tr = criarLinhaUsuarios(usuario);
    tbody.appendChild(tr);
  });
}

// INICIALIZAÇÃO
async function init() {
    let usuarios = await getAllUsuarios()
    renderTable(usuarios.response.usuario)
}

document.addEventListener('DOMContentLoaded', init);