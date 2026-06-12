/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.4.26
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const bodyParser = require('body-parser')

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const {
    inserirNovoUsuario,
    atualizarUsuario,
    listarUsuario,
    buscarUsuario,
    excluirUsuario
} = require('../controller/usuario/controller_usuario.js')

// Usuarios
router.post('/', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoUsuario(dados, contentType)
    res.status(result.status_code).json(result)
})

router.get('/', async (req,res) => {
    let result = await listarUsuario()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarUsuario(id)
    res.status(result.status_code).json(result)
})

router.put('/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarUsuario(dados, id, contentType)
    res.status(result.status_code).json(result)
})

router.delete('/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirUsuario(id)
    res.status(result.status_code).json(result)
})

module.exports = router