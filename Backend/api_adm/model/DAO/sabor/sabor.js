/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela sabor
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de sabor
const insertSabor = async (sabor) => {
    let sql = `INSERT INTO tbl_sabor (sabor)
               VALUES ('${sabor.sabor}')`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de sabor
const updateSabor = async (sabor) => {
    let sql = `UPDATE tbl_sabor
               SET  sabor = '${sabor.sabor}'
               WHERE id = ${sabor.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas sabors
const selectAllSabor = async () => {
    let sql = `SELECT * FROM tbl_sabor ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma sabor pelo id
const selectByIdSabor = async (id) => {
    let sql = `SELECT * FROM tbl_sabor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de sabor
const deleteSabor = async (id) => {
    let sql = `DELETE FROM tbl_sabor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertSabor,
    updateSabor,
    selectAllSabor,
    selectByIdSabor,
    deleteSabor
}