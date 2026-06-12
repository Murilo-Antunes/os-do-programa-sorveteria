/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de lote
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const loteDAO = require('../../model/DAO/lote/lote.js')

// inserir nova lote
const inserirNovoLote = async (lote, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(lote, contentType)
        if(validar) return validar // 400 ou 415

        let result = await loteDAO.insertLote(lote)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        lote.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, lote)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar lote
const atualizarLote = async (lote, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(lote, contentType)
        if(validar) return validar // 400 ou 415

        let resultBuscarId = await buscarLote(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        lote.id = Number(id)
        let result = await loteDAO.updateLote(lote)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, lote)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas lotes
const listarLote = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await loteDAO.selectAllLote()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarLoteMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarLoteMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar lote pelo id
const buscarLote = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await loteDAO.selectByIdLote(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir lote pelo id
const excluirLote = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarLote(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await loteDAO.deleteLote(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (lote, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(lote.numero == undefined || lote.numero == null || lote.numero == '' ||  typeof(lote.numero) != 'number'){
        message.ERROR_BAD_REQUEST.field = '[NUMERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(lote.quantidade == undefined || lote.quantidade == null || lote.quantidade == '' || typeof(lote.quantidade) != 'number'){
        message.ERROR_BAD_REQUEST.field = '[QUANTIDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(lote.data_fabricacao == undefined || lote.data_fabricacao == null || lote.data_fabricacao == '' || String(lote.data_fabricacao).length != 10 || typeof(lote.data_fabricacao) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[DATA FABRICAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(lote.data_validade == undefined || lote.data_validade == null || lote.data_validade == '' || String(lote.data_validade).length != 10 || typeof(lote.data_validade) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[DATA VALIDADE] INVÁLIDO'
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

    if(response != null) base.DEFAULT_MESSAGE.response.lote = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoLote,
    atualizarLote,
    listarLote,
    buscarLote,
    excluirLote
}