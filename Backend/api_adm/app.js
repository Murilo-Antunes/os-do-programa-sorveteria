/*******************************************************************************************
 * Objetivo: Arquivo principal responsável pela criação da API Administrativa da Sorvetudos
 * Autor: Julio Augusto
 * data: 09/06/2026
 * versão: 1.0
 * *****************************************************************************************/

/***************************************
    Dependencias para rodar o projeto:
        npm install express --save
        npm install cors --save
        npm install body-parser --save
        npm install mysql2 --save
        npm install knex --save
        npm install multer --save
        npm install node-fetch --save
        npm install bcrypt --save
 **************************************/

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
const verifyJWT = async (req, res, next) => {
    let message = JSON.parse(JSON.stringify(config_message))
    let mensagem = message.ERROR_UNAUTHORIZED
    mensagem.message = "Token inválido."

    // import da biblioteca para validação dos tokens
    const jwt = require('./middleware/middlewareJWT.js')

    // recebe o token encaminhado no header da requisição
    let token = req.headers['x-access-token']

    // valida a autencidade do token
    const autenticidadeToken = await jwt.validateJWT(token)

    // valida se a requisição podera continuar
    if(autenticidadeToken.status) 
        next()
    else
        return res.status(mensagem.status_code).json(mensagem).end()
}

// ****** ROTAS *******
// Import das rotas
const categoriaRouter = require('./routes/categoria.routes.js')
const ingredienteRouter = require('./routes/ingrediente.routes.js')
const loteRouter = require('./routes/lote.routes.js')
const produtoRouter = require('./routes/produto.routes.js')
const promocaoRouter = require('./routes/promocao.routes.js')
const saborRouter = require('./routes/sabor.routes.js')
const tagRouter = require('./routes/tag.routes.js')
const usuarioRouter = require('./routes/usuario.routes.js')
const authRouter = require('./routes/auth.routes.js')
const tamanhoRouter = require('./routes/tamanho.routes.js')
const filtroRouter = require('./routes/filtro.routes.js')
const pesquisaRouter = require('./routes/pesquisa.routes.js')

// filtro
app.use('/v1/sorvetudos/admin/produtos/filtro', cors(), filtroRouter)

// pesquisa
app.use('/v1/sorvetudos/admin/produtos/pesquisa', cors(), pesquisaRouter)

// categoria
app.use('/v1/sorvetudos/admin/categorias', cors(), verifyJWT, categoriaRouter)

// ingrediente
app.use('/v1/sorvetudos/admin/ingredientes', cors(), verifyJWT, ingredienteRouter)

// lote
app.use('/v1/sorvetudos/admin/lotes', cors(), verifyJWT, loteRouter)

// produto
app.use('/v1/sorvetudos/admin/produtos', cors(), verifyJWT, produtoRouter)

// promocao
app.use('/v1/sorvetudos/admin/promocoes', cors(), verifyJWT, promocaoRouter)

// sabor
app.use('/v1/sorvetudos/admin/sabores', cors(), verifyJWT, saborRouter)

// tag
app.use('/v1/sorvetudos/admin/tags', cors(), verifyJWT, tagRouter)

// usuario
app.use('/v1/sorvetudos/admin/usuarios', cors(), usuarioRouter)

// tamanho
app.use('/v1/sorvetudos/admin/tamanhos', cors(),  verifyJWT, tamanhoRouter)

// auth login
app.use('/v1/sorvetudos/admin/auth/login', cors(), authRouter)

// Iniciando o Servidor
app.listen(port, () => {
    console.log(`API Sorvetudos rodando em http://localhost:${port}`)
})