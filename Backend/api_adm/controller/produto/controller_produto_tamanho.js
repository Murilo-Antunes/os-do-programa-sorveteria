/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoTamanho
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoTamanhoDAO = require('../../model/DAO/produto_tamanho/produto_tamanho.js')

// inserir novo produtoTamanho
const inserirNovoProdutoTamanho = async (produtoTamanho, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(produtoTamanho, contentType)
        if(validar) return validar

        let result = await produtoTamanhoDAO.insertProdutoTamanho(produtoTamanho)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        produtoTamanho.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoTamanho)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produtoTamanho
const atualizarProdutoTamanho = async (produtoTamanho, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoTamanho, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarProdutoTamanho(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produtoTamanho.id = Number(id)
        let result = await produtoTamanhoDAO.updateProdutoTamanho(produtoTamanho)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoTamanho)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtoTamanhoes
const listarProdutoTamanho = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoTamanhoDAO.selectAllProdutoTamanho()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarProdutoTamanhoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoTamanhoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtoTamanho pelo id
const buscarProdutoTamanho = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoTamanhoDAO.selectByIdProdutoTamanho(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produtoTamanho pelo id
const excluirProdutoTamanho = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProdutoTamanho(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoTamanhoDAO.deleteProdutoTamanho(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtos pelo id do tamanho
const buscarProdutosIdTamanho = async (idTamanho) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idTamanho)
       if(validarID) return validarID

        let result = await produtoTamanhoDAO.selectProdutosByIdTamanho(idTamanho)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar tamanhoes pelo id do produto
const buscarTamanhosIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idProduto)
       if(validarID) return validarID

        let result = await produtoTamanhoDAO.selectTamanhosByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir tamanhoes relacionados ao produto
const excluirTamanhosIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoTamanhoDAO.deleteTamanhosByIdProduto(idProduto)

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

const validarDados = async (produtoTamanho, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(produtoTamanho.id_produto == undefined || produtoTamanho.id_produto == '' || produtoTamanho.id_produto == null || produtoTamanho.id_produto <= 0 || isNaN(produtoTamanho.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produtoTamanho.id_tamanho == undefined || produtoTamanho.id_tamanho == '' || produtoTamanho.id_tamanho == null || produtoTamanho.id_tamanho <= 0 || isNaN(produtoTamanho.id_tamanho)){
        message.ERROR_BAD_REQUEST.field = '[ID_tamanho] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produtoTamanho = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProdutoTamanho,
    atualizarProdutoTamanho,
    listarProdutoTamanho,
    buscarProdutoTamanho,
    excluirProdutoTamanho,
    buscarProdutosIdTamanho,
    buscarTamanhosIdProduto,
    excluirTamanhosIdProduto
}