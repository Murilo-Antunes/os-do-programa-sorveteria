/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de promocao
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const promocaoDAO = require('../../model/DAO/promocao/promocao.js')

// inserir nova promocao
const inserirNovaPromocao = async (promocao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(promocao, contentType)
        if(validar) return validar // 400 ou 415

        let result = await promocaoDAO.insertPromocao(promocao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        promocao.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, promocao)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar promocao
const atualizarPromocao = async (promocao, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(promocao, contentType)
        if(validar) return validar // 400 ou 415

        let resultBuscarId = await buscarPromocao(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        promocao.id = Number(id)
        let result = await promocaoDAO.updatePromocao(promocao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, promocao)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas promocaos
const listarPromocao = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await promocaoDAO.selectAllPromocao()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarPromocaoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarPromocaoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar promocao pelo id
const buscarPromocao = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await promocaoDAO.selectByIdPromocao(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir promocao pelo id
const excluirPromocao = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarPromocao(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await promocaoDAO.deletePromocao(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (promocao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(promocao.valor_atual == undefined || promocao.valor_atual == null || promocao.valor_atual == '' || Number(promocao.valor_atual).toFixed(2).length > 6 || typeof(promocao.valor_atual) != 'number'){
        message.ERROR_BAD_REQUEST.field = '[VALOR ATUAL] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(promocao.valor_promocao == undefined || promocao.valor_promocao == null || promocao.valor_promocao == '' || Number(promocao.valor_promocao).toFixed(2).length > 6 || typeof(promocao.valor_promocao) != 'number'){
        message.ERROR_BAD_REQUEST.field = '[VALOR PROMOÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(promocao.status == undefined || promocao.status == null || promocao.status == '' || String(promocao.status).length > 1 || typeof(promocao.status) != 'number'){
        message.ERROR_BAD_REQUEST.field = '[STATUS] INVÁLIDO'
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

    if(response != null) base.DEFAULT_MESSAGE.response.promocao = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovaPromocao,
    atualizarPromocao,
    listarPromocao,
    buscarPromocao,
    excluirPromocao
}