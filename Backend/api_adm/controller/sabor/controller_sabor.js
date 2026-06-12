/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de sabor
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const saborDAO = require('../../model/DAO/sabor/sabor.js')

// inserir nova sabor
const inserirNovoSabor = async (sabor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(sabor, contentType)
        if(validar) return validar // 400 ou 415

        let result = await saborDAO.insertSabor(sabor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        sabor.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, sabor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar sabor
const atualizarSabor = async (sabor, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(sabor, contentType)
        if(validar) return validar // 400 ou 415

        let resultBuscarId = await buscarSabor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        sabor.id = Number(id)
        let result = await saborDAO.updateSabor(sabor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, sabor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas sabors
const listarSabor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await saborDAO.selectAllSabor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarSaborMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarSaborMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar sabor pelo id
const buscarSabor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await saborDAO.selectByIdSabor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir sabor pelo id
const excluirSabor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarSabor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await saborDAO.deleteSabor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (sabor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(sabor.sabor == undefined || sabor.sabor == null || sabor.sabor == '' || sabor.sabor.length > 50 || typeof(sabor.sabor) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[SABOR] INVÁLIDO'
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

    if(response != null) base.DEFAULT_MESSAGE.response.sabor = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoSabor,
    atualizarSabor,
    listarSabor,
    buscarSabor,
    excluirSabor
}