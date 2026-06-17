'use strict'

export const BASE_URL = 'https://backend-adm-sorvetudos.onrender.com/v1/sorvetudos/admin'

let token = localStorage.getItem('token')

export const getAllUsuarios = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/usuarios`

  let response = await fetch(url, OPTIONS)
  if(!response.ok) throw new Error('Erro ao pegar usuarios')

  let data = await response.json()

  return data
}

export const getByIdUsuario = async (id) =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/usuarios/${id}`

  let response = await fetch(url, OPTIONS)
  let data = await response.json()

  return data
}

export const putByIdUsuario = async (usuario) =>{
    const OPTIONS = {
        headers: {
        'x-access-token': token,
        },
        method: 'PUT',
        body: JSON.stringify(usuario)
    }

    let url  = `${BASE_URL}/usuarios/${usuario.id}`

    let response = await fetch(url, OPTIONS)
    let data = await response.json()

    return data
}

export const deleteByIdUsuario = async (id) =>{
    const OPTIONS = {
        headers: {
        'x-access-token': token,
        },
        method: 'DELETE'
    }

    let url = `${BASE_URL}/usuarios/${id}`

    let response = await fetch(url, OPTIONS)
    let data = await response.json()

    return data
} 

export const postUsuario = async (usuario) =>{
  const OPTIONS = {
    method: 'POST',
    headers: {
      'x-access-token': token,
    },
    body: JSON.stringify(usuario),
  } 


  let response = await fetch(`${BASE_URL}/usuarios`, OPTIONS)

  let data = await response.json()
  return data
}