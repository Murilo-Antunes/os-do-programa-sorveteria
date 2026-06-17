const BASE_URL = 'https://backend-catalogo-sorvetudos.onrender.com/v1/sorvetudos/catalogo'

window.categorias = []
window.SIZES = []
window.INGREDIENT_OPTIONS = []
window.SABORES = []
window.TAGS = []
window.PRODUTOS = []

export const pegarCategorias = async () => {
  let response = await fetch(`${BASE_URL}/categorias`)
  let data = await response.json()
  return data.response.categoria
}

export const pegarTamanhos = async () => {
  let response = await fetch(`${BASE_URL}/tamanhos`)
  let data = await response.json()
  return data.response.tamanho
}

export const pegarIngredientes = async () => {
  let response = await fetch(`${BASE_URL}/ingredientes`)
  let data = await response.json()
  return data.response.ingrediente
}

export const pegarSabores = async () => {
  let response = await fetch(`${BASE_URL}/sabores`)
  let data = await response.json()
  return data.response.sabor
}

export const pegarTags = async () => {
  let response = await fetch(`${BASE_URL}/tags`)
  let data = await response.json()
  return data.response.tag
}

export const pegarProdutos = async () => {
  let response = await fetch(`${BASE_URL}/produtos`)
  let data = await response.json()
  return data.response.produto
}

export const alimentarAtributos = async () => {
  window.categorias         = await pegarCategorias()
  window.SIZES              = await pegarTamanhos()
  window.INGREDIENT_OPTIONS = await pegarIngredientes()
  window.SABORES            = await pegarSabores()
  window.TAGS               = await pegarTags()
  window.PRODUTOS           = await pegarProdutos()

  // CORREÇÃO: forEach movido para cá, depois dos dados carregarem
  window.PRODUTOS.forEach((p, i) => {
    p.sizes = ["P", "M", "G"];
    if (i % 3 === 0) {
      p.oldPrice = Math.round(p.preco * 1.25 * 10) / 10; // CORREÇÃO: era p.price, campo correto é p.preco
    }
  });
}

// Busca produto por id na API
window.getProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`)
  const data = await response.json()
  console.log(data)
  return data.response.produto[0]
}

export const pegarProdutoRelacionados = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos`)
  const data = await response.json()
  return data.response.produto.filter(p => p.id !== id).slice(0, 4)
}

// Sanitização XSS
window.escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));