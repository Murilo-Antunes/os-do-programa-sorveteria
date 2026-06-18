export const BASE_URL = 'https://backend-adm-sorvetudos.onrender.com/v1/sorvetudos/admin'

export let SABORES = [];
export let CATEGORIAS = [];
export let INGREDIENTES = [];
export let TAGS = [];
export let TAMANHOS = [];
let token = localStorage.getItem('token')

function verificar401(res) {
  if (!res) return
  if (res.status == 401) {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
    throw new Error('Não autorizado')
  }
}

export const pegarCategorias = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/categorias`

  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    if(!response.ok) throw new Error('Erro ao pegar categorias')

    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar categorias:', err)
    throw err
  }
}

export const pegarSabores= async () =>{
  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/sabores`

  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar sabores:', err)
    throw err
  }
}

export const pegarTags = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url  = `${BASE_URL}/tags`

  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar tags:', err)
    throw err
  }
}

export const pegarTamanhos = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/tamanhos`

  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar tamanhos:', err)
    throw err
  }
} 

export const pegarIngredientes = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/ingredientes`

  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar ingredientes:', err)
    throw err
  }
} 

export const cadastrarProduto = async (formData) =>{
  const OPTIONS = {
    method: 'POST',
    headers: {
      'x-access-token': token,
    },
    body: formData,
  } 


  try {
    let response = await fetch(`${BASE_URL}/produtos`, OPTIONS)
    verificar401(response)

    let data = await response.json()
    return data
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err)
    throw err
  }
}

export const obterAtributos = async () =>{
  let data_categoria = await pegarCategorias()
  let data_sabores = await pegarSabores()
  let data_tags = await pegarTags()
  let data_tamanhos = await pegarTamanhos()
  let data_ingredientes = await pegarIngredientes()


  CATEGORIAS = data_categoria.response.categoria
  SABORES = data_sabores.response.sabor
  TAGS =  data_tags.response.tag
  TAMANHOS = data_tamanhos.response.tamanho
  INGREDIENTES = data_ingredientes.response.ingrediente
}


