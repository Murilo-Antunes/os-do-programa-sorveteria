/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela promocao
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de promocao
const insertPromocao = async (promocao) => {
    let sql = `INSERT INTO tbl_promocao (
                                        valor_atual,
                                        valor_promocao,
                                        status
                                        )
               VALUES (${promocao.valor_atual},
                       ${promocao.valor_promocao},
                       ${promocao.status}
                        )`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de promocao
const updatePromocao = async (promocao) => {
    let sql = `UPDATE tbl_promocao
               SET  valor_atual = ${promocao.valor_atual},
                    valor_promocao = ${promocao.valor_promocao},
                    status = ${promocao.status}
               WHERE id = ${promocao.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas promocaos
const selectAllPromocao = async () => {
    let sql = `SELECT * FROM tbl_promocao ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma promocao pelo id
const selectByIdPromocao = async (id) => {
    let sql = `SELECT * FROM tbl_promocao
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de promocao
const deletePromocao = async (id) => {
    let sql = `DELETE FROM tbl_promocao
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertPromocao,
    updatePromocao,
    selectAllPromocao,
    selectByIdPromocao,
    deletePromocao
}