/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de tamanho
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const tamanhoDAO = require('../../model/DAO/tamanho/tamanho.js')

// inserir nova tamanho
const inserirNovoTamanho = async (tamanho, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(tamanho, contentType)
        if(validar) return validar // 400 ou 415

        let result = await tamanhoDAO.insertTamanho(tamanho)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        tamanho.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, tamanho)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar tamanho
const atualizarTamanho = async (tamanho, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(tamanho, contentType)
        if(validar) return validar // 400 ou 415

        let resultBuscarId = await buscarTamanho(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        tamanho.id = Number(id)
        let result = await tamanhoDAO.updateTamanho(tamanho)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, tamanho)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas tamanhos
const listarTamanho = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await tamanhoDAO.selectAllTamanho()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarTamanhoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarTamanhoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar tamanho pelo id
const buscarTamanho = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await tamanhoDAO.selectByIdTamanho(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir tamanho pelo id
const excluirTamanho = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarTamanho(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await tamanhoDAO.deleteTamanho(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (tamanho, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(tamanho.tamanho == undefined || tamanho.tamanho == null || tamanho.tamanho == '' || tamanho.tamanho.length > 10 || typeof(tamanho.tamanho) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[TAMANHO] INVÁLIDO'
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

    if(response != null) base.DEFAULT_MESSAGE.response.tamanho = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoTamanho,
    atualizarTamanho,
    listarTamanho,
    buscarTamanho,
    excluirTamanho
}