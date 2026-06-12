/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para a pesquisa
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const pesquisaDAO = require('../../model/DAO/pesquisa/pesquisa.js')
const controllerProduto = require('../produto/controller_produto.js')

// pesquisar produtos
const pesquisarProdutos = async (nomeProduto) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await pesquisaDAO.selectByNomeProduto(nomeProduto)
        let produtos = []
        
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(let idProduto of result){
            let produto = await controllerProduto.buscarProduto(idProduto.id)
            produtos.push(produto.response)
        }

        let pesquisarProdutosMessage = await montarMensagem(message, message.SUCESS_RESPONSE, produtos)
        message.DEFAULT_MESSAGE.response.count = result.length

        return pesquisarProdutosMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.pesquisa = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {pesquisarProdutos}