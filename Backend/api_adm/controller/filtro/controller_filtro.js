/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o filtro
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const filtroDAO = require('../../model/DAO/filtro/filtro.js')
const controllerProduto = require('../produto/controller_produto.js')

// filtrar produtos
const filtrarProdutos = async (filtro) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filtroDAO.selectByFiltro(filtro)
        let produtos = []

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(let idProduto of result){
            let produto = await controllerProduto.buscarProduto(idProduto.id_produto)
            produtos.push(produto.response)
        }

        let filtrarProdutosMessage = await montarMensagem(message, message.SUCESS_RESPONSE, produtos)
        message.DEFAULT_MESSAGE.response.count = result.length

        return filtrarProdutosMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.filtro = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {filtrarProdutos}