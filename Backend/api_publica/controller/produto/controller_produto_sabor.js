/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoSabor
  * Autor: Juan Carlos
 * data: 11/06/2026
 * versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const produtoSaborDAO = require('../../model/DAO/produto_sabor/produto_sabor.js')

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

    if(response != null) base.DEFAULT_MESSAGE.response.produtoSabor = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    listarProdutoSabor,
    buscarProdutoSabor,
    buscarProdutosIdSabor,
    buscarSaboresIdProduto
}