/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoIngrediente
 * Autor: Juan Carlos
 * data: 11/06/2026
 * versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoIngredienteDAO = require('../../model/DAO/produto_ingrediente/produto_ingrediente.js')

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

    if(response != null) base.DEFAULT_MESSAGE.response.produtoIngrediente = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    listarProdutoIngrediente,
    buscarProdutoIngrediente,
    buscarProdutosIdIngrediente,
    buscarIngredientesIdProduto
}