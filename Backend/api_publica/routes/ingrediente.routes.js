/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const {
    listarIngrediente,
    buscarIngrediente
} = require('../controller/ingrediente/controller_ingrediente.js')

// Ingredientes

router.get('/', async (req,res) => {
    let result = await listarIngrediente()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarIngrediente(id)
    res.status(result.status_code).json(result)
})

module.exports = router