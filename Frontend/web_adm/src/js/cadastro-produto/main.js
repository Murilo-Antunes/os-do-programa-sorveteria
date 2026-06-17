export const BASE_URL = 'https://backend-adm-sorvetudos.onrender.com/v1/sorvetudos/admin'

export let SABORES = [];
export let CATEGORIAS = [];
export let INGREDIENTES = [];
export let TAGS = [];
export let TAMANHOS = [];
let token = localStorage.getItem('token')

export const pegarCategorias = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/categorias`

  let response = await fetch(url, OPTIONS)
  if(!response.ok) throw new Error('Erro ao pegar categorias')

  let data = await response.json()
  console.log(data)

  return data
}

export const pegarSabores= async () =>{
  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/sabores`

  let response = await fetch(url, OPTIONS)
  let data = await response.json()

  return data
}

export const pegarTags = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url  = `${BASE_URL}/tags`

  let response = await fetch(url, OPTIONS)
  let data = await response.json()

  return data
}

export const pegarTamanhos = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/tamanhos`

  let response = await fetch(url, OPTIONS)
  let data = await response.json()

  return data
} 

export const pegarIngredientes = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/ingredientes`

  let response = await fetch(url, OPTIONS)
  let data = await response.json()

  return data
} 

export const cadastrarProduto = async (formData) =>{
  const OPTIONS = {
    method: 'POST',
    headers: {
      'x-access-token': token,
    },
    body: formData,
  } 


  let response = await fetch(`${BASE_URL}/produtos`, OPTIONS)

  let data = await response.json()
  return data
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


