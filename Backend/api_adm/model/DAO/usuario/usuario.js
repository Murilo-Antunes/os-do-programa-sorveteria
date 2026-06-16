/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela usuario
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de usuario
const insertUsuario = async (usuario) => {
    let sql = `INSERT INTO tbl_usuario (
                                        nome,
                                        email,
                                        senha,
                                        nivel_de_acesso,
                                        token
                                        )
               VALUES ('${usuario.nome}',
                       '${usuario.email}',
                       '${usuario.senha}',
                       ${usuario.nivel_de_acesso},
                       null
                        )`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {console.log(error)}

    return false
}

// update de usuario
const updateUsuario = async (usuario) => {
    let token = usuario.token
    if(token == null || token == undefined || token.trim() == ''){
        token = null
    }

    // Atualiza o token apenas quando (usuario.token) for enviado.
    // Caso contrário, mantém o valor atual do banco.
    let sql = `UPDATE tbl_usuario
               SET  nome = '${usuario.nome}',
                    email = '${usuario.email}',
                    senha = '${usuario.senha}',
                    nivel_de_acesso = ${usuario.nivel_de_acesso}
                    ${token != null ? `,token = '${token}'` : ''}
               WHERE id = ${usuario.id}`
    
    try {
        let response = await knexConex.raw(sql)
        
        if(response) return response

    } catch (error) {console.log(error)}

    return false
}
// select de todas usuarios
const selectAllUsuario = async () => {
    let sql = `SELECT * FROM tbl_usuario ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma usuario pelo id
const selectByIdUsuario = async (id) => {
    let sql = `SELECT * FROM tbl_usuario
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}
// delete de usuario
const deleteUsuario = async (id) => {
    let sql = `DELETE FROM tbl_usuario
               WHERE id = ${id}
               AND nivel_de_acesso < 2`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertUsuario,
    updateUsuario,
    selectAllUsuario,
    selectByIdUsuario,
    deleteUsuario
}