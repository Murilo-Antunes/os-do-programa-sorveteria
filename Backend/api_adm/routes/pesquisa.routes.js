/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de pesquisa
 * Data: 11/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const {
    pesquisarProdutos
} = require('../controller/pesquisa/controller_pesquisa.js')

// endpoint para pesquisar produtos
router.get('/', async (req,res) => {
    const dados = req.query.nome_produto

    let result = await pesquisarProdutos(dados)

    res.status(result.status_code).json(result)
})

module.exports = router