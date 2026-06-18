import {
  getAllUsuarios,
  getByIdUsuario,
  postUsuario,
  putByIdUsuario,
  deleteByIdUsuario,
} from './usuarios.js'

// Busca elemento pelo ID
const getById = (id) => document.getElementById(id)

// Lê valor de input e remove espaços
const getInputValue = (id) => getById(id)?.value.trim() ?? ''

// Verifica se texto é válido
const isValidText = (value) =>
  typeof value === 'string' && value.trim() !== '' && isNaN(value) && value.length <= 255

// Valida formato de email simples
const isValidEmail = (email) =>
  typeof email === 'string' && email.trim() !== '' && email.includes('@') && email.length <= 255

// Verifica tamanho mínimo e máximo da senha
const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 5 && password.length <= 255

// Verifica se nível de acesso é um número positivo
const isValidAccessLevel = (level) => {
  const value = Number(level)
  return Number.isFinite(value) && value > 0
}

// Valida input numérico em tempo real - remove caracteres não numéricos
const validarInputNumerico = (event) => {
  const input = event.target
  input.value = input.value.replace(/[^\d]/g, '')
}

// Valida campos de usuário
const validarUsuario = ({ nome, email, senha, nivel }, senhaObrigatoria = true) => {
  const erros = []

  if (!isValidText(nome)) erros.push('Nome inválido.')
  if (!isValidEmail(email)) erros.push('Email inválido.')
  if (senhaObrigatoria) {
    if (!isValidPassword(senha)) erros.push('Senha deve ter entre 5 e 255 caracteres.')
  } else if (senha && !isValidPassword(senha)) {
    erros.push('Senha deve ter entre 5 e 255 caracteres.')
  }
  if (!isValidAccessLevel(nivel)) erros.push('Nível de acesso inválido.')

  if (erros.length > 0) {
    alert(`Corrija os seguintes campos:\n\n${erros.map((mensagem) => `• ${mensagem}`).join('\n')}`)
    return false
  }

  return true
}

const iniciarLoadingBotao = (button, textoLoading) => {
  if (!button) return
  button.disabled = true
  button.classList.add('btn-loading')
  if (textoLoading) button.textContent = textoLoading
}

const finalizarLoadingBotao = (button, textoPadrao) => {
  if (!button) return
  button.disabled = false
  button.classList.remove('btn-loading')
  if (textoPadrao) button.textContent = textoPadrao
}

// Abre o modal informado
const abrirModal = (id) => {
  const modal = getById(id)
  if (!modal) return
  modal.classList.add('aberto')
}

// Fecha o modal informado
const fecharModal = (id) => {
  const modal = getById(id)
  if (!modal) return
  modal.classList.remove('aberto')
}

document.querySelectorAll('.modal-overlay').forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) fecharModal(overlay.id)
  })
})

let usuarioSelecionadoId = null

// Cria linha da tabela para um usuário
const criarLinhaUsuarios = (usuario) => {
  const tr = document.createElement('tr')
  tr.dataset.id = usuario.id

  const mostrarAcoes = usuario.nivel_de_acesso <= 1
  const acoesHtml = mostrarAcoes
    ? `
      <div class="button-container">
        <button class="btn-remover" aria-label="Excluir usuário: ${usuario.nome}" data-id="${usuario.id}">remover</button>
        <button class="btn-editar" aria-label="Editar usuário: ${usuario.nome}" data-id="${usuario.id}">editar</button>
      </div>
    `
    : `<div class="button-container usuario-protegido">🔒 Administrador</div>`

  tr.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.nivel_de_acesso}</td>
    <td>${acoesHtml}</td>
  `

  if (mostrarAcoes) {
    tr.querySelector('.btn-remover').addEventListener('click', () => {
      usuarioSelecionadoId = usuario.id
      const mensagemRemover = getById('remover-mensagem')
      if (mensagemRemover) {
        mensagemRemover.textContent = `Deseja remover o usuário (${usuario.nome})?`
      }
      abrirModal('modal-remover')
    })

    tr.querySelector('.btn-editar').addEventListener('click', async () => {
      try {
        const res = await getByIdUsuario(usuario.id)
        const usuarioAtual = res.response?.usuario?.[0] ?? res.response ?? usuario

        usuarioSelecionadoId = usuarioAtual.id
        getById('editar-titulo').textContent = `Editar usuário: ${usuarioAtual.nome}`
        getById('editar-nome').value = usuarioAtual.nome ?? ''
        getById('editar-email').value = usuarioAtual.email ?? ''
        getById('editar-senha').value = ''
        getById('editar-nivel').value = usuarioAtual.nivel_de_acesso ?? ''
        abrirModal('modal-editar')
      } catch {
        alert('Não foi possível carregar os dados do usuário.')
      }
    })
  }

  return tr
}

// Renderiza a lista de usuários na tabela
const renderTable = (usuarios) => {
  const tbody = getById('users-tbody')
  const emptyState = getById('empty-state')

  if (!tbody) return
  tbody.innerHTML = ''

  if (!Array.isArray(usuarios) || usuarios.length === 0) {
    if (emptyState) emptyState.hidden = false
    return
  }

  if (emptyState) emptyState.hidden = true
  usuarios.forEach((usuario) => tbody.appendChild(criarLinhaUsuarios(usuario)))
}

// Busca todos os usuários e atualiza a tabela
const carregarUsuarios = async () => {
  const response = await getAllUsuarios()
  renderTable(response.response?.usuario)
}

// Limpa o valor de vários campos
const limparCampos = (...ids) => ids.forEach((id) => {
  const element = getById(id)
  if (element) element.value = ''
})

// Abre modal de inserir usuário e limpa campos
const abrirModalInserir = () => {
  limparCampos('inserir-nome', 'inserir-email', 'inserir-senha', 'inserir-nivel')
  abrirModal('modal-inserir')
}

// Fecha os modais de inserir, editar e remover
const fecharModalInserir = () => fecharModal('modal-inserir')
const fecharModalEditar = () => fecharModal('modal-editar')
const fecharModalRemover = () => fecharModal('modal-remover')

// Fecha o modal e mostra a mensagem de erro
const exibirErro = (mensagem, modalId) => {
  if (modalId) fecharModal(modalId)
  alert(mensagem)
}

// Trata a submissão de novo usuário
const confirmarInserirUsuario = async () => {
  const usuario = {
    nome: getInputValue('inserir-nome'),
    email: getInputValue('inserir-email'),
    senha: getInputValue('inserir-senha'),
    nivel: getInputValue('inserir-nivel'),
  }

  if (!validarUsuario(usuario, true)) return

  const botaoInserir = getById('btn-confirmar-inserir')
  try {
    iniciarLoadingBotao(botaoInserir, 'Inserindo...')
    const res = await postUsuario({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      nivel_de_acesso: Number(usuario.nivel),
    })

    if (res.status === 201 || res.status === 200 || res.status === true) {
      fecharModalInserir()
      await carregarUsuarios()
      return
    }

    exibirErro(res.message ?? 'Erro ao inserir usuário.', 'modal-inserir')
  } catch {
    exibirErro('Erro ao inserir usuário. Tente novamente.', 'modal-inserir')
  } finally {
    finalizarLoadingBotao(botaoInserir, 'Inserir Usuário')
  }
}

// Trata a atualização de usuário existente
const confirmarEditarUsuario = async () => {
  if (!usuarioSelecionadoId) {
    alert('Nenhum usuário selecionado para edição.')
    return
  }

  const usuario = {
    nome: getInputValue('editar-nome'),
    email: getInputValue('editar-email'),
    senha: getInputValue('editar-senha'),
    nivel: getInputValue('editar-nivel'),
  }

  if (!validarUsuario(usuario, true)) return

  const payload = {
    id: usuarioSelecionadoId,
    nome: usuario.nome,
    email: usuario.email,
    nivel_de_acesso: Number(usuario.nivel),
  }
  if (usuario.senha) payload.senha = usuario.senha

  const botaoEditar = getById('btn-confirmar-editar')
  try {
    iniciarLoadingBotao(botaoEditar, 'Salvando...')
    const res = await putByIdUsuario(payload)

    if (res.status === 200 || res.status === true) {
      fecharModalEditar()
      await carregarUsuarios()
      return
    }

    exibirErro(res.message ?? 'Erro ao editar usuário.', 'modal-editar')
  } catch {
    exibirErro('Erro ao editar usuário. Tente novamente.', 'modal-editar')
  } finally {
    finalizarLoadingBotao(botaoEditar, 'Confirmar Alteração')
  }
}

// Trata a remoção de usuário selecionado
const confirmarRemoverUsuario = async () => {
  if (!usuarioSelecionadoId) {
    alert('Nenhum usuário selecionado para remoção.')
    return
  }

  const botaoRemover = getById('btn-confirmar-remover')
  try {
    iniciarLoadingBotao(botaoRemover, 'Removendo...')
    const res = await deleteByIdUsuario(usuarioSelecionadoId)

    if (res.status === 200 || res.status === true) {
      fecharModalRemover()
      await carregarUsuarios()
      return
    }

    if (res.status === 401) {
      alert('Você não tem permissão para remover este usuário.')
      fecharModalRemover()
      return
    }
    exibirErro(res.message ?? 'Erro ao remover usuário.', 'modal-remover')
  } catch {
    exibirErro('Erro ao remover usuário. Tente novamente.', 'modal-remover')
  } finally {
    finalizarLoadingBotao(botaoRemover, 'remover')
  }
}

// Adiciona listener de click se o elemento existir
const addClickListener = (id, callback) => {
  const element = getById(id)
  if (!element) return
  element.addEventListener('click', callback)
}

addClickListener('btn-abrir-inserir', abrirModalInserir)
addClickListener('fechar-inserir', fecharModalInserir)
addClickListener('btn-cancelar-inserir', fecharModalInserir)
addClickListener('btn-confirmar-inserir', confirmarInserirUsuario)

addClickListener('fechar-editar', fecharModalEditar)
addClickListener('btn-cancelar-editar', fecharModalEditar)
addClickListener('btn-confirmar-editar', confirmarEditarUsuario)

addClickListener('fechar-remover', fecharModalRemover)
addClickListener('btn-cancelar-remover', fecharModalRemover)
addClickListener('btn-confirmar-remover', confirmarRemoverUsuario)

// Validação de input numérico em tempo real
const inputInserirNivel = getById('inserir-nivel')
const inputEditarNivel = getById('editar-nivel')

if (inputInserirNivel) {
  inputInserirNivel.addEventListener('input', validarInputNumerico)
}

if (inputEditarNivel) {
  inputEditarNivel.addEventListener('input', validarInputNumerico)
}

document.addEventListener('DOMContentLoaded', carregarUsuarios)