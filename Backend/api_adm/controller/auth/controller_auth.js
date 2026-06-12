/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de auth
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const authDAO = require('../../model/DAO/auth/auth.js')
const jwt = require('../../middleware/middlewareJWT.js')
const bcrypt = require('../../services/bcrypt.js')
const controllerUsuario = require('../usuario/controller_usuario.js')

// autenticar usuário
const autenticarUsuario = async (usuario, contentType) => {

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        const validarUsuario = await validarDados(usuario, contentType)
        if(validarUsuario) return validarUsuario
        
        let dadosUsuario = await authDAO.selectAuth(usuario)

        if (!dadosUsuario || dadosUsuario.length < 1)
            return message.ERROR_UNAUTHORIZED

        const validarSenha = await bcrypt.validarSenha(usuario.senha, dadosUsuario[0].senha)
        if(!validarSenha) return message.ERROR_UNAUTHORIZED

        let validarToken = await jwt.validateJWT(dadosUsuario[0].token)
        if(validarToken.status) return await montarMensagem(message,message.SUCESS_RESPONSE,dadosUsuario)

        // se o token estiver expirado ou for o primeiro login cria um novo e salva no banco
        if(validarToken['error']['expiredAt'] || dadosUsuario[0].token == null){
            let tokenUser = await jwt.createJWT(dadosUsuario[0].id) // gera token JWT

            dadosUsuario[0].token = tokenUser

            let dadosUpdateUsuario = await controllerUsuario.atualizarUsuario(dadosUsuario[0],dadosUsuario[0].id,'application/json')

            return await montarMensagem(message,message.SUCESS_RESPONSE,dadosUsuario)
        }
       
        return message.ERROR_UNAUTHORIZED

    } catch (error) {
        console.log(error)
    }

    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

const validarDados = async (usuario, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(usuario.nome == undefined || usuario.nome == null || usuario.nome == '' || usuario.nome.length > 255 || typeof(usuario.nome) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(usuario.email == undefined || usuario.email == null || usuario.email == '' || usuario.email.length > 255 || typeof(usuario.email) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[EMAIL] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(usuario.senha == undefined || usuario.senha == null || usuario.senha == '' || usuario.senha.length > 30 || typeof(usuario.senha) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[SENHA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.auth = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    autenticarUsuario
}