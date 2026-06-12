/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoTag
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoTagDAO = require('../../model/DAO/produto_tag/produto_tag.js')

// inserir novo produtoTag
const inserirNovoProdutoTag = async (produtoTag, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(produtoTag, contentType)
        if(validar) return validar

        let result = await produtoTagDAO.insertProdutoTag(produtoTag)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        produtoTag.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoTag)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produtoTag
const atualizarProdutoTag = async (produtoTag, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoTag, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarProdutoTag(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produtoTag.id = Number(id)
        let result = await produtoTagDAO.updateProdutoTag(produtoTag)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoTag)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtoTages
const listarProdutoTag = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoTagDAO.selectAllProdutoTag()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarProdutoTagMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoTagMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtoTag pelo id
const buscarProdutoTag = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoTagDAO.selectByIdProdutoTag(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produtoTag pelo id
const excluirProdutoTag = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProdutoTag(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoTagDAO.deleteProdutoTag(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtos pelo id do tag
const buscarProdutosIdTag = async (idTag) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idTag)
       if(validarID) return validarID

        let result = await produtoTagDAO.selectProdutosByIdTag(idTag)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar tages pelo id do produto
const buscarTagsIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idProduto)
       if(validarID) return validarID

        let result = await produtoTagDAO.selectTagsByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir tages relacionados ao produto
const excluirTagsIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoTagDAO.deleteTagsByIdProduto(idProduto)

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

const validarDados = async (produtoTag, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(produtoTag.id_produto == undefined || produtoTag.id_produto == '' || produtoTag.id_produto == null || produtoTag.id_produto <= 0 || isNaN(produtoTag.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produtoTag.id_tag == undefined || produtoTag.id_tag == '' || produtoTag.id_tag == null || produtoTag.id_tag <= 0 || isNaN(produtoTag.id_tag)){
        message.ERROR_BAD_REQUEST.field = '[ID_TAG] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produtoTag = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProdutoTag,
    atualizarProdutoTag,
    listarProdutoTag,
    buscarProdutoTag,
    excluirProdutoTag,
    buscarProdutosIdTag,
    buscarTagsIdProduto,
    excluirTagsIdProduto
}