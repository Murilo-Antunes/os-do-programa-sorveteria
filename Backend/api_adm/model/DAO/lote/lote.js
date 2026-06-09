/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela lote
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de lote
const insertLote = async (lote) => {
    let sql = `INSERT INTO tbl_lote (
                                        numero,
                                        data_fabricacao,
                                        data_validade,
                                        quantidade
                                        )
               VALUES (${lote.numero},
                       '${lote.data_fabricacao}',
                       '${lote.data_validade}',
                       ${lote.quantidade}
                        )`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de lote
const updateLote = async (lote) => {
    let sql = `UPDATE tbl_lote
               SET  numero = ${lote.numero},
                    data_fabricacao = '${lote.data_fabricacao}',
                    data_validade = '${lote.data_validade}',
                    quantidade = ${lote.quantidade}
               WHERE id = ${lote.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas lotes
const selectAllLote = async () => {
    let sql = `SELECT * FROM tbl_lote ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma lote pelo id
const selectByIdLote = async (id) => {
    let sql = `SELECT * FROM tbl_lote
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de lote
const deleteLote = async (id) => {
    let sql = `DELETE FROM tbl_lote
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertLote,
    updateLote,
    selectAllLote,
    selectByIdLote,
    deleteLote
}