/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela ingrediente
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de ingrediente
const insertIngrediente = async (ingrediente) => {
    let sql = `INSERT INTO tbl_ingrediente (ingrediente)
               VALUES ('${ingrediente.ingrediente}')`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de ingrediente
const updateIngrediente = async (ingrediente) => {
    let sql = `UPDATE tbl_ingrediente
               SET  ingrediente = '${ingrediente.ingrediente}'
               WHERE id = ${ingrediente.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas ingredientes
const selectAllIngrediente = async () => {
    let sql = `SELECT * FROM tbl_ingrediente ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma ingrediente pelo id
const selectByIdIngrediente = async (id) => {
    let sql = `SELECT * FROM tbl_ingrediente
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de ingrediente
const deleteIngrediente = async (id) => {
    let sql = `DELETE FROM tbl_ingrediente
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertIngrediente,
    updateIngrediente,
    selectAllIngrediente,
    selectByIdIngrediente,
    deleteIngrediente
}