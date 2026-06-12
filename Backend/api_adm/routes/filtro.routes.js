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

const formatarJson = async (dados) => {
    

    return produto
}

const {
    filtrarProdutos
} = require('../controller/filtro/controller_filtro.js')

// endpoint para filtrar produtos
router.get('/', async (req,res) => {
    const dados = {
        idProduto     : req.query.id_produto || null,
        idCategoria   : req.query.id_categoria || null,
        idSabor       : req.query.id_sabor || null,
        idPromocao    : req.query.id_promocao || null,
        idTamanho     : req.query.id_tamanho || null,
        idLote        : req.query.id_lote || null,
        idIngrediente : req.query.id_ingrediente || null,
        idTag         : req.query.id_tag || null
    }

    let result = await filtrarProdutos(dados)

    res.status(result.status_code).json(result)
})

module.exports = router