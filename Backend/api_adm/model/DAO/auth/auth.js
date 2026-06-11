/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela usuario
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// valida o usuario adm
const selectAuth = async (usuario) => {

    let sql = `SELECT *
               FROM tbl_usuario
               WHERE email = '${usuario.email}'
               AND nivel_de_acesso = 1`

    let response = await knexConex.raw(sql)

    if(response)
        return response[0]

    return false
}
module.exports = {
    selectAuth
}