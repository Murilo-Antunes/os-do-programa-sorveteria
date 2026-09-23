/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produto
 * Autor: Juan Carlos
 * data: 11/06/2026
 * versão: 1.0
 * *******************************************************************************************************/
const config_message = require('../module/configMessages.js')
const produtoDAO = require('../../model/DAO/produto/produto.js')

// import das controllers
const controllerProdutoCategoria = require('./controller_produto_categoria.js')
const controllerProdutoIngrediente = require('./controller_produto_ingrediente.js')
const controllerProdutoSabor = require('./controller_produto_sabor.js')
const controllerProdutoTag = require('./controller_produto_tag.js')
const controllerProdutoTamanho = require('./controller_produto_tamanho.js')

// listar todas produtos
const listarProduto = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoDAO.selectAllProduto()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(produto of result){
            let categoria = await controllerProdutoCategoria.buscarCategoriasIdProduto(produto.id)
            if(categoria.status){
                produto.categoria = categoria.response.produtoCategoria
            }

            let ingrediente = await controllerProdutoIngrediente.buscarIngredientesIdProduto(produto.id)
            if(ingrediente.status){
                produto.ingrediente = ingrediente.response.produtoIngrediente
            }

            let sabor = await controllerProdutoSabor.buscarSaboresIdProduto(produto.id)
            if(sabor.status){
                produto.sabor = sabor.response.produtoSabor
            }

            let tag = await controllerProdutoTag.buscarTagsIdProduto(produto.id)
            if(tag.status){
                produto.tag = tag.response.produtoTag
            }

            let tamanho = await controllerProdutoTamanho.buscarTamanhosIdProduto(produto.id)
            if(tamanho.status){
                produto.tamanho = tamanho.response.produtoTamanho
            }
        }

        let listarProdutoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produto pelo id
const buscarProduto = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoDAO.selectByIdProduto(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        for(produto of result){
            let categoria = await controllerProdutoCategoria.buscarCategoriasIdProduto(produto.id)
            if(categoria.status){
                produto.categoria = categoria.response.produtoCategoria
            }

            let ingrediente = await controllerProdutoIngrediente.buscarIngredientesIdProduto(produto.id)
            if(ingrediente.status){
                produto.ingrediente = ingrediente.response.produtoIngrediente
            }

            let sabor = await controllerProdutoSabor.buscarSaboresIdProduto(produto.id)
            if(sabor.status){
                produto.sabor = sabor.response.produtoSabor
            }

            let tag = await controllerProdutoTag.buscarTagsIdProduto(produto.id)
            if(tag.status){
                produto.tag = tag.response.produtoTag
            }

            let tamanho = await controllerProdutoTamanho.buscarTamanhosIdProduto(produto.id)
            if(tamanho.status){
                produto.tamanho = tamanho.response.produtoTamanho
            }
        }

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarId = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    
    if(id == undefined || id == '' || id == null || id <= 0 || isNaN(id)){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produto = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    listarProduto,
    buscarProduto
}