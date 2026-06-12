/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela tamanho
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de tamanho
const insertTamanho = async (tamanho) => {
    let sql = `INSERT INTO tbl_tamanho (tamanho)
               VALUES ('${tamanho.tamanho}')`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de tamanho
const updateTamanho = async (tamanho) => {
    let sql = `UPDATE tbl_tamanho
               SET  tamanho = '${tamanho.tamanho}'
               WHERE id = ${tamanho.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas tamanhos
const selectAllTamanho = async () => {
    let sql = `SELECT * FROM tbl_tamanho ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma tamanho pelo id
const selectByIdTamanho = async (id) => {
    let sql = `SELECT * FROM tbl_tamanho
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de tamanho
const deleteTamanho = async (id) => {
    let sql = `DELETE FROM tbl_tamanho
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertTamanho,
    updateTamanho,
    selectAllTamanho,
    selectByIdTamanho,
    deleteTamanho
}