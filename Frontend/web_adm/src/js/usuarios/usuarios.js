'use strict'

export const BASE_URL = 'http://localhost:8080/v1/sorvetudos/admin'

let token = localStorage.getItem('token')

function verificar401(res) {
  if (!res) return
  if (res.status == 401) {
    localStorage.removeItem('token')
    window.location.href = '../../index.html'
    throw new Error('Não autorizado')
  }
}

export const getAllUsuarios = async () => {
  const OPTIONS = {
    headers: { 'x-access-token': token },
  }
  try {
    let response = await fetch(`${BASE_URL}/usuarios`, OPTIONS)
    verificar401(response)
    if (!response.ok) throw new Error('Erro ao pegar usuarios')
    return await response.json()
  } catch (err) {
    console.error('Erro ao buscar users:', err)
    throw err
  }
}

export const getByIdUsuario = async (id) => {
  const OPTIONS = {
    headers: { 'x-access-token': token },
  }
  try {
    let response = await fetch(`${BASE_URL}/usuarios/${id}`, OPTIONS)
    verificar401(response)
    return await response.json()
  } catch (err) {
    console.error('Erro ao buscar usuário por id:', err)
    throw err
  }
}

export const postUsuario = async (usuario) => {
  const OPTIONS = {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',   // ← corrigido
    },
    body: JSON.stringify(usuario),
  }
  try {
    let response = await fetch(`${BASE_URL}/usuarios`, OPTIONS)
    verificar401(response)
    return await response.json()
  } catch (err) {
    console.error('Erro ao criar usuário:', err)
    throw err
  }
}

export const putByIdUsuario = async (usuario) => {
  const OPTIONS = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',   // ← corrigido
    },
    body: JSON.stringify(usuario),
  }
  try {
    let response = await fetch(`${BASE_URL}/usuarios/${usuario.id}`, OPTIONS)
    verificar401(response)
    return await response.json()
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err)
    throw err
  }
}

export const deleteByIdUsuario = async (id) => {
  const OPTIONS = {
    method: 'DELETE',
    headers: { 'x-access-token': token },
  }
  try {
    let response = await fetch(`${BASE_URL}/usuarios/${id}`, OPTIONS)
    verificar401(response)
    
    if (!response.ok) throw new Error('Erro ao deletar usuário')
    return await response.json()
  } catch (err) {
    console.error('Erro ao deletar usuário:', err)
    throw err
  }
}
