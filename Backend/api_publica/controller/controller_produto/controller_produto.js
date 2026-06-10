/*******************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados MySQL na tabela filme 
 * Autor: Juan Carlos 
 * Data: 11/06/2026
 * Versão: 1.0
 *******************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../module/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do produto no banco de dados
const produtoDAO = require('../../model/DAO/produto/produto.js')



// Listar Produtos
const listarProduto = async function(){
    
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Chama a função do DAO para retornar a lista de todos os filmes
        let result = await produtoDAO.selectAllProduto()

        //Validação para verificar se o DAO conseguiu processar os dados
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.produto = result

                return message.DEFAULT_MESSAGE //200 
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}


// Buscar produto por ID
const buscarProduto = async function(id){
    
    
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Validaçção para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null ||  isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400
        }else{
            let result = await produtoDAO.selectAllProduto(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto = result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


// const buscarProdutoNome = async function(nomeProduto){
    
    
//     let message = JSON.parse(JSON.stringify(config_message))
    
//     try {
//         //Validaçção para garantir que o ID seja válido
//         if(nomeProduto == undefined || nomeProduto == '' ||  typeof nomeProduto == 'string' ){
//             message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
//             return message.ERROR_BAD_REQUEST //400
//         }else{
//             let result = await produtoDAO.selectByProdutoNome(nomeProduto)

//             if(result){
//                 if(typeof result == 'string'){
//                     message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
//                     message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
//                     message.DEFAULT_MESSAGE.response.produto = result

//                     return message.DEFAULT_MESSAGE //200
//                 }else{
//                     return message.ERROR_NOT_FOUND //404
//                 }
//             }else{
//                 return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
//             }
//         }
//     } catch (error) {
//         return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
//     }
// }

const filtrarProduto = async function(filtro) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {

        // Validação básica
        if (!filtro || typeof filtro != 'object') {
            message.ERROR_BAD_REQUEST.field = '[FILTRO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        }

        let result = await produtoDAO.selectbyFiltro(filtro)

        if(result){

            if(result.length > 0){

                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.produto = result

                return message.DEFAULT_MESSAGE

            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}



 module.exports = {
    listarProduto,
    buscarProduto,
    filtrarProduto
    
}