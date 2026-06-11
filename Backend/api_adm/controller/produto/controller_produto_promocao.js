/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoPromocao
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoPromocaoDAO = require('../../model/DAO/produto_promocao/produto_promocao.js')

// inserir novo produtoPromocao
const inserirNovoProdutoPromocao = async (produtoPromocao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(produtoPromocao, contentType)
        if(validar) return validar

        let result = await produtoPromocaoDAO.insertProdutoPromocao(produtoPromocao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        produtoPromocao.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoPromocao)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produtoPromocao
const atualizarProdutoPromocao = async (produtoPromocao, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoPromocao, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarProdutoPromocao(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produtoPromocao.id = Number(id)
        let result = await produtoPromocaoDAO.updateProdutoPromocao(produtoPromocao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoPromocao)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtoPromocaoes
const listarProdutoPromocao = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoPromocaoDAO.selectAllProdutoPromocao()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarProdutoPromocaoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoPromocaoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtoPromocao pelo id
const buscarProdutoPromocao = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoPromocaoDAO.selectByIdProdutoPromocao(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produtoPromocao pelo id
const excluirProdutoPromocao = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProdutoPromocao(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoPromocaoDAO.deleteProdutoPromocao(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtos pelo id do promocao
const buscarProdutosIdPromocao = async (idPromocao) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idPromocao)
       if(validarID) return validarID

        let result = await produtoPromocaoDAO.selectProdutosByIdPromocao(idPromocao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar promocaoes pelo id do produto
const buscarPromocoesIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idProduto)
       if(validarID) return validarID

        let result = await produtoPromocaoDAO.selectPromocoesByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir promocaoes relacionados ao produto
const excluirPromocoesIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoPromocaoDAO.deletePromocoesByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

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

const validarDados = async (produtoPromocao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(produtoPromocao.id_produto == undefined || produtoPromocao.id_produto == '' || produtoPromocao.id_produto == null || produtoPromocao.id_produto <= 0 || isNaN(produtoPromocao.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produtoPromocao.id_promocao == undefined || produtoPromocao.id_promocao == '' || produtoPromocao.id_promocao == null || produtoPromocao.id_promocao <= 0 || isNaN(produtoPromocao.id_promocao)){
        message.ERROR_BAD_REQUEST.field = '[ID_PROMOCAO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produtoPromocao = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProdutoPromocao,
    atualizarProdutoPromocao,
    listarProdutoPromocao,
    buscarProdutoPromocao,
    excluirProdutoPromocao,
    buscarProdutosIdPromocao,
    buscarPromocoesIdProduto,
    excluirPromocoesIdProduto
}