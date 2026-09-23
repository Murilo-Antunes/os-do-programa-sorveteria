/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de tamanho
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const {
    listarTamanho,
    buscarTamanho
} = require('../controller/tamanho/controller_tamanho.js')

// tamanhos
router.get('/', async (req,res) => {
    let result = await listarTamanho()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarTamanho(id)
    res.status(result.status_code).json(result)
})

module.exports = router