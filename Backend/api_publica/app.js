/*******************************************************************************************
 * Objetivo: Arquivo principal responsável pela criação da API Administrativa da Sorvetudos
 * Autor: Juan Carlos
 * data: 11/06/2026
 * versão: 1.0
 * *****************************************************************************************/


// IMPORT das dependências para criar a API
const express = require('express')
const cors = require('cors')

// Criando um objeto para manipular o EXPRESS
const app = express()

// Porta onde a API esta rodando
const port = 8080

// Conjuntos de Permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Autorization']
}
// import das menssagens padronizadas
const config_message = require('./controller/module/configMessages.js')

// Configura as permissões da API através do CORS
app.use(cors(corsOptions))

// Recebe o token encaminhado nas requisições e solicitar as validações

// ****** ROTAS *******
// Import das rotas
const categoriaRouter = require('./routes/categoria.routes.js')
const ingredienteRouter = require('./routes/ingrediente.routes.js')
const produtoRouter = require('./routes/produto.routes.js')
const saborRouter = require('./routes/sabor.routes.js')
const tagRouter = require('./routes/tag.routes.js')
const tamanhoRouter = require('./routes/tamanho.routes.js')
const filtroRouter = require('./routes/filtro.routes.js')
const pesquisaRouter = require('./routes/pesquisa.routes.js')

// filtro
app.use('/v1/sorvetudos/catalogo/produtos/filtro', cors(), filtroRouter)

// pesquisa
app.use('/v1/sorvetudos/catalogo/produtos/pesquisa', cors(), pesquisaRouter)

// categoria
app.use('/v1/sorvetudos/catalogo/categorias', cors(),  categoriaRouter)

// ingrediente
app.use('/v1/sorvetudos/catalogo/ingredientes', cors(),  ingredienteRouter)

// produto
app.use('/v1/sorvetudos/catalogo/produtos', cors(),  produtoRouter)

// sabor
app.use('/v1/sorvetudos/catalogo/sabores', cors(),  saborRouter)

// tag
app.use('/v1/sorvetudos/catalogo/tags', cors(),  tagRouter)

// tamanho
app.use('/v1/sorvetudos/catalogo/tamanhos', cors(),   tamanhoRouter)

// Iniciando o Servidor
app.listen(port, () => {
    console.log(`API Sorvetudos rodando em http://localhost:${port}`)
})