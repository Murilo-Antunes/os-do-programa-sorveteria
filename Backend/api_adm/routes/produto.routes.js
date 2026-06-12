/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.4.26
 * *********************************************************************************/

// import do express
const express = require('express')
const multer = require('multer') // upload de arquivos

// instancia para criar um objeto com as caracteristicas do multer
const upload = multer()

// Cria um objeto de rota para o arquivo
const router = express.Router()

const bodyParser = require('body-parser')

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const {
    inserirNovoProduto,
    atualizarProduto,
    listarProduto,
    buscarProduto,
    excluirProduto
} = require('../controller/produto/controller_produto.js')

const formatarJson = async (dados) => {
    const produto = {
        nome        : dados.nome,
        descricao   : dados.descricao,
        preco       : Number(dados.preco),
        status      : Number(dados.status),
        tamanho     : JSON.parse(dados.tamanho),
        categoria   : JSON.parse(dados.categoria),
        sabor       : JSON.parse(dados.sabor),
        tag         : JSON.parse(dados.tag),
        promocao    : JSON.parse(dados.promocao),
        lote        : JSON.parse(dados.lote),
        ingrediente : JSON.parse(dados.ingrediente)
    }

    return produto
}

// Produtos
router.post('/', bodyParserJSON, upload.single('img'), async (req,res) => {
    let dados = await formatarJson(req.body)
    let img = req.file
    let contentType = req.headers['content-type']

    let result = await inserirNovoProduto(dados, img, contentType)
    res.status(result.status_code).json(result)
})

router.get('/', async (req,res) => {
    let result = await listarProduto()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarProduto(id)
    res.status(result.status_code).json(result)
})

router.put('/:id', bodyParserJSON, upload.single('img'), async (req,res) => {
    let id = req.params.id
    let dados = await formatarJson(req.body)
    let img = req.file
    let contentType = req.headers['content-type']

    let result = await atualizarProduto(dados, id, contentType)
    res.status(result.status_code).json(result)
})

router.delete('/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirProduto(id)
    res.status(result.status_code).json(result)
})

module.exports = router