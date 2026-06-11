/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de ingrediente
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const ingredienteDAO = require('../../model/DAO/ingrediente/ingrediente.js')

// inserir novo ingrediente
const inserirNovoIngrediente = async (ingrediente, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(ingrediente, contentType)
        if(validar) return validar // 400 ou 415

        let result = await ingredienteDAO.insertIngrediente(ingrediente)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        ingrediente.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, ingrediente)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar ingrediente
const atualizarIngrediente = async (ingrediente, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(ingrediente, contentType)
        if(validar) return validar // 400 ou 415

        let resultBuscarId = await buscarIngrediente(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        ingrediente.id = Number(id)
        let result = await ingredienteDAO.updateIngrediente(ingrediente)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, ingrediente)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas ingredientes
const listarIngrediente = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await ingredienteDAO.selectAllIngrediente()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarIngredienteMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarIngredienteMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar ingrediente pelo id
const buscarIngrediente = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await ingredienteDAO.selectByIdIngrediente(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir ingrediente pelo id
const excluirIngrediente = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarIngrediente(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await ingredienteDAO.deleteIngrediente(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (ingrediente, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(ingrediente.ingrediente == undefined || ingrediente.ingrediente == null || ingrediente.ingrediente == '' || ingrediente.ingrediente.length > 50 || typeof(ingrediente.ingrediente) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[INGREDIENTE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
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

    if(response != null) base.DEFAULT_MESSAGE.response.ingrediente = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoIngrediente,
    atualizarIngrediente,
    listarIngrediente,
    buscarIngrediente,
    excluirIngrediente
}