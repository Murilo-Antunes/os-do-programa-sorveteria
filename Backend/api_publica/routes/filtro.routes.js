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
    filtrarProdutos
} = require('../controller/filtro/controller_filtro.js')

// endpoint para filtrar produtos
router.get('/', async (req,res) => {
    const dados = {
        idProduto     : req.query.id_produto || null,
        idCategoria   : req.query.id_categoria || null,
        idSabor       : req.query.id_sabor || null,
        idTamanho     : req.query.id_tamanho || null,
        idIngrediente : req.query.id_ingrediente || null,
        idTag         : req.query.id_tag || null
    }

    let result = await filtrarProdutos(dados)

    res.status(result.status_code).json(result)
})

module.exports = router