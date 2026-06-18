import {
  getAllUsuarios,
  getByIdUsuario,
  postUsuario,
  putByIdUsuario,
  deleteByIdUsuario,
} from './usuarios.js'

// ── Utilitários de modal ─────────────────────────────────────────────────────
function abrirModal(id)  { document.getElementById(id).classList.add('aberto') }
function fecharModal(id) { document.getElementById(id).classList.remove('aberto') }

// Fecha ao clicar no overlay (fora da caixa)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) fecharModal(overlay.id)
  })
})

// ── Guarda o id do usuário alvo (editar / remover) ───────────────────────────
let usuarioAlvoId = null

// ── Renderização da tabela ───────────────────────────────────────────────────
function criarLinhaUsuarios(usuario) {
  const tr = document.createElement('tr')
  tr.dataset.id = usuario.id

  tr.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.nivel_de_acesso}</td>
    <td>
      <div class="button-container">
        <button
          class="btn-remover"
          aria-label="Excluir usuário: ${usuario.nome}"
          data-id="${usuario.id}"
        >remover</button>
        <button
          class="btn-editar"
          aria-label="Editar usuário: ${usuario.nome}"
          data-id="${usuario.id}"
        >editar</button>
      </div>
    </td>
  `

  // Botão remover → abre modal de confirmação
  tr.querySelector('.btn-remover').addEventListener('click', () => {
    usuarioAlvoId = usuario.id
    document.getElementById('remover-mensagem').textContent =
      `Deseja remover o usuário (${usuario.nome})?`
    abrirModal('modal-remover')
  })

  // Botão editar → busca dados atuais e abre modal de edição
  tr.querySelector('.btn-editar').addEventListener('click', async () => {
    try {
      const res = await getByIdUsuario(usuario.id)
      const u   = res.response?.usuario?.[0] ?? res.response ?? usuario

      usuarioAlvoId = u.id
      document.getElementById('editar-titulo').textContent = `Editar usuário: ${u.nome}`
      document.getElementById('editar-nome').value  = u.nome             ?? ''
      document.getElementById('editar-email').value = u.email            ?? ''
      document.getElementById('editar-senha').value = ''
      document.getElementById('editar-nivel').value = u.nivel_de_acesso  ?? ''
      abrirModal('modal-editar')
    } catch {
      alert('Não foi possível carregar os dados do usuário.')
    }
  })

  return tr
}

function renderTable(lista) {
  const tbody      = document.getElementById('users-tbody')
  const emptyState = document.getElementById('empty-state')

  tbody.innerHTML = ''

  if (!lista || lista.length === 0) {
    emptyState.hidden = false
    return
  }

  emptyState.hidden = true
  lista.forEach(u => tbody.appendChild(criarLinhaUsuarios(u)))
}

async function carregarUsuarios() {
  const data = await getAllUsuarios()
  renderTable(data.response.usuario)
}

// ── Modal: Inserir ───────────────────────────────────────────────────────────
document.getElementById('btn-abrir-inserir').addEventListener('click', () => {
  ;['inserir-nome', 'inserir-email', 'inserir-senha', 'inserir-nivel']
    .forEach(id => (document.getElementById(id).value = ''))
  abrirModal('modal-inserir')
})

document.getElementById('fechar-inserir').addEventListener('click',       () => fecharModal('modal-inserir'))
document.getElementById('btn-cancelar-inserir').addEventListener('click', () => fecharModal('modal-inserir'))

document.getElementById('btn-confirmar-inserir').addEventListener('click', async () => {
  const nome  = document.getElementById('inserir-nome').value.trim()
  const email = document.getElementById('inserir-email').value.trim()
  const senha = document.getElementById('inserir-senha').value.trim()
  const nivel = document.getElementById('inserir-nivel').value.trim()

  if (!nome || !email || !senha || !nivel) {
    alert('Preencha todos os campos.')
    return
  }

  try {
    const res = await postUsuario({ nome, email, senha, nivel_de_acesso: Number(nivel) })

    if (res.status === 201 || res.status === 200 || res.status === true) {
      fecharModal('modal-inserir')
      await carregarUsuarios()   // atualiza a tabela automaticamente
    } else {
      alert(res.message ?? 'Erro ao inserir usuário.')
    }
  } catch {
    alert('Erro ao inserir usuário. Tente novamente.')
  }
})

// ── Modal: Editar ────────────────────────────────────────────────────────────
document.getElementById('fechar-editar').addEventListener('click',       () => fecharModal('modal-editar'))
document.getElementById('btn-cancelar-editar').addEventListener('click', () => fecharModal('modal-editar'))

document.getElementById('btn-confirmar-editar').addEventListener('click', async () => {
  const nome  = document.getElementById('editar-nome').value.trim()
  const email = document.getElementById('editar-email').value.trim()
  const senha = document.getElementById('editar-senha').value.trim()
  const nivel = document.getElementById('editar-nivel').value.trim()

  if (!nome || !email || !nivel) {
    alert('Preencha pelo menos nome, email e nível de acesso.')
    return
  }

  const payload = { id: usuarioAlvoId, nome, email, nivel_de_acesso: Number(nivel) }
  if (senha) payload.senha = senha   // só envia senha se o campo foi preenchido

  try {
    const res = await putByIdUsuario(payload)

    if (res.status === 200 || res.status === true) {
      fecharModal('modal-editar')
      await carregarUsuarios()
    } else {
      alert(res.message ?? 'Erro ao editar usuário.')
    }
  } catch {
    alert('Erro ao editar usuário. Tente novamente.')
  }
})

// ── Modal: Remover ───────────────────────────────────────────────────────────
document.getElementById('fechar-remover').addEventListener('click',       () => fecharModal('modal-remover'))
document.getElementById('btn-cancelar-remover').addEventListener('click', () => fecharModal('modal-remover'))

document.getElementById('btn-confirmar-remover').addEventListener('click', async () => {
  try {
    const res = await deleteByIdUsuario(usuarioAlvoId)

    if (res.status === 200 || res.status === true) {
      fecharModal('modal-remover')
      await carregarUsuarios()
    } else {
      alert(res.message ?? 'Erro ao remover usuário.')
    }
  } catch {
    alert('Erro ao remover usuário. Tente novamente.')
  }
})

// ── Inicialização ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', carregarUsuarios)
