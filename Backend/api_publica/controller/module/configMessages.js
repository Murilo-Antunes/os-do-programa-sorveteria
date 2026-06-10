/*******************************************************
 * Objetivo: Arquivo responsavel pela confguração e padronização das mensagens da API
 * Autor: Juan Carlos 
 * Data: 11/06/2026
 * Versão: 1.0
 *******************************************************/

const DEFAUT_MESSAGE = {
    api_description :   'Api para gerenciar o contole de Produtos.',
    development:        'Juan Carlos Fonseca',
    version :           '1.0.4.26',
    status:             Boolean,
    status_code:        Number,
    response:           {}
}






//Mensagens de erro da API
const ERROR_BAD_REQUEST                 = {status: false, status_code: 400, message: 'Os dados enviados na requisição não estão corretos.'}
const ERROR_INTERNAL_SERVER_MODEL       = {status: false, status_code: 500, message: 'Não foi possível processar a requisição por conta de erro na API [ERRO NA MODELAGEM DE DADOS].'}
const ERROR_INTERNAL_SERVER_CONTROLLER  = {status: false, status_code: 500, message: 'Não foi possível processar a requisição por conta de erro na API [ERRO NA CONTROLLER].'}
const ERROR_CONTENT_TYPE                = {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois o formato de dados aceito pela API é somente JSON.'}

//Mensagens de Sucesso da API
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Registro inserido com sucesso!'}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    SUCCESS_CREATED_ITEM
}