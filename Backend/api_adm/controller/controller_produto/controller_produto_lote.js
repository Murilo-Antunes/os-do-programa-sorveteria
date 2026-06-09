/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoLote
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoLoteDAO = require('../../model/DAO/produto_lote/produto_lote.js')

// inserir novo produtoLote
const inserirNovoProdutoLote = async (produtoLote, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(produtoLote, contentType)
        if(validar) return validar

        let result = await produtoLoteDAO.insertProdutoLote(produtoLote)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        produtoLote.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoLote)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produtoLote
const atualizarProdutoLote = async (produtoLote, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoLote, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarProdutoLote(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produtoLote.id = Number(id)
        let result = await produtoLoteDAO.updateProdutoLote(produtoLote)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoLote)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtoLotees
const listarProdutoLote = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoLoteDAO.selectAllProdutoLote()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarProdutoLoteMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoLoteMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtoLote pelo id
const buscarProdutoLote = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoLoteDAO.selectByIdProdutoLote(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produtoLote pelo id
const excluirProdutoLote = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProdutoLote(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoLoteDAO.deleteProdutoLote(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtos pelo id do lote
const buscarProdutosIdLote = async (idLote) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idLote)
       if(validarID) return validarID

        let result = await produtoLoteDAO.selectProdutosByIdLote(idLote)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar lotees pelo id do produto
const buscarLotesIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idProduto)
       if(validarID) return validarID

        let result = await produtoLoteDAO.selectLotesByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir lotees relacionados ao produto
const excluirLotesIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoLoteDAO.deleteLotesByIdProduto(idProduto)

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

const validarDados = async (produtoLote, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(produtoLote.id_produto == undefined || produtoLote.id_produto == '' || produtoLote.id_produto == null || produtoLote.id_produto <= 0 || isNaN(produtoLote.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produtoLote.id_lote == undefined || produtoLote.id_lote == '' || produtoLote.id_lote == null || produtoLote.id_lote <= 0 || isNaN(produtoLote.id_lote)){
        message.ERROR_BAD_REQUEST.field = '[ID_LOTE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produtoLote = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProdutoLote,
    atualizarProdutoLote,
    listarProdutoLote,
    buscarProdutoLote,
    excluirProdutoLote,
    buscarProdutosIdLote,
    buscarLotesIdProduto,
    excluirLotesIdProduto
}