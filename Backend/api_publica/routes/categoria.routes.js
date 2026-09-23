/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
  * Autor: Juan Carlos
 * data: 11/06/2026
 * versão: 1.0
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const {
    listarCategoria,
    buscarCategoria
} = require('../controller/categoria/controller_categoria.js')

// categorias
router.get('/', async (req,res) => {
    let result = await listarCategoria()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarCategoria(id)
    res.status(result.status_code).json(result)
})

module.exports = router