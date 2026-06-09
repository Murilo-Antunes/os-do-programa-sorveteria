/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoIngrediente
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoIngredienteDAO = require('../../model/DAO/produto_ingrediente/produto_ingrediente.js')

// inserir novo produtoIngrediente
const inserirNovoProdutoIngrediente = async (produtoIngrediente, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(produtoIngrediente, contentType)
        if(validar) return validar

        let result = await produtoIngredienteDAO.insertProdutoIngrediente(produtoIngrediente)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        produtoIngrediente.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoIngrediente)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produtoIngrediente
const atualizarProdutoIngrediente = async (produtoIngrediente, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoIngrediente, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarProdutoIngrediente(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produtoIngrediente.id = Number(id)
        let result = await produtoIngredienteDAO.updateProdutoIngrediente(produtoIngrediente)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoIngrediente)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtoIngredientees
const listarProdutoIngrediente = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoIngredienteDAO.selectAllProdutoIngrediente()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarProdutoIngredienteMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoIngredienteMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtoIngrediente pelo id
const buscarProdutoIngrediente = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoIngredienteDAO.selectByIdProdutoIngrediente(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produtoIngrediente pelo id
const excluirProdutoIngrediente = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProdutoIngrediente(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoIngredienteDAO.deleteProdutoIngrediente(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produtos pelo id do ingrediente
const buscarProdutosIdIngrediente = async (idIngrediente) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idIngrediente)
       if(validarID) return validarID

        let result = await produtoIngredienteDAO.selectProdutosByIdIngrediente(idIngrediente)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar ingredientees pelo id do produto
const buscarIngredientesIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idProduto)
       if(validarID) return validarID

        let result = await produtoIngredienteDAO.selectIngredientesByIdProduto(idProduto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir ingredientees relacionados ao produto
const excluirIngredientesIdProduto = async (idProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoIngredienteDAO.deleteIngredientesByIdProduto(idProduto)

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

const validarDados = async (produtoIngrediente, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(produtoIngrediente.id_produto == undefined || produtoIngrediente.id_produto == '' || produtoIngrediente.id_produto == null || produtoIngrediente.id_produto <= 0 || isNaN(produtoIngrediente.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produtoIngrediente.id_ingrediente == undefined || produtoIngrediente.id_ingrediente == '' || produtoIngrediente.id_ingrediente == null || produtoIngrediente.id_ingrediente <= 0 || isNaN(produtoIngrediente.id_ingrediente)){
        message.ERROR_BAD_REQUEST.field = '[ID_INGREDIENTE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produtoIngrediente = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProdutoIngrediente,
    atualizarProdutoIngrediente,
    listarProdutoIngrediente,
    buscarProdutoIngrediente,
    excluirProdutoIngrediente,
    buscarProdutosIdIngrediente,
    buscarIngredientesIdProduto,
    excluirIngredientesIdProduto
}