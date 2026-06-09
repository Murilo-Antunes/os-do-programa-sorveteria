/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoSabor
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoSaborDAO = require('../../model/DAO/produto_sabor/produto_sabor.js')

// inserir novo produtoSabor
const inserirNovoProdutoSabor = async (produtoSabor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(produtoSabor, contentType)
        if(validar) return validar

        let result = await produtoSaborDAO.insertProdutoSabor(produtoSabor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        produtoSabor.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoSabor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produtoSabor
const atualizarProdutoSabor = async (produtoSabor, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoSabor, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarProdutoSabor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produtoSabor.id = Number(id)
        let result = await produtoSaborDAO.updateProdutoSabor(produtoSabor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoSabor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtoSabores
const listarProdutoSabor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoSaborDAO.selectAllProdutoSabor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarProdutoSaborMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoSaborMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtoSabor pelo id
const buscarProdutoSabor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoSaborDAO.selectByIdProdutoSabor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produtoSabor pelo id
const excluirProdutoSabor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProdutoSabor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoSaborDAO.deleteProdutoSabor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtos pelo id do sabor
const buscarProdutosIdSabor = async (idSabor) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idSabor)
       if(validarID) return validarID

        let result = await produtoSaborDAO.selectProdutosByIdSabor(idSabor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar sabores pelo id do produto
const buscarSaboresIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idProduto)
       if(validarID) return validarID

        let result = await produtoSaborDAO.selectSaboresByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir sabores relacionados ao produto
const excluirSaboresIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoSaborDAO.deleteSaboresByIdProduto(idProduto)

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

const validarDados = async (produtoSabor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(produtoSabor.id_produto == undefined || produtoSabor.id_produto == '' || produtoSabor.id_produto == null || produtoSabor.id_produto <= 0 || isNaN(produtoSabor.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produtoSabor.id_sabor == undefined || produtoSabor.id_sabor == '' || produtoSabor.id_sabor == null || produtoSabor.id_sabor <= 0 || isNaN(produtoSabor.id_sabor)){
        message.ERROR_BAD_REQUEST.field = '[ID_SABOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produtoSabor = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProdutoSabor,
    atualizarProdutoSabor,
    listarProdutoSabor,
    buscarProdutoSabor,
    excluirProdutoSabor,
    buscarProdutosIdSabor,
    buscarSaboresIdProduto,
    excluirSaboresIdProduto
}