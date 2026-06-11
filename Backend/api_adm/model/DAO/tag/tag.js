/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela tag
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de tag
const insertTag = async (tag) => {
    let sql = `INSERT INTO tbl_tag (tag)
               VALUES ('${tag.tag}')`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de tag
const updateTag = async (tag) => {
    let sql = `UPDATE tbl_tag
               SET  tag = '${tag.tag}'
               WHERE id = ${tag.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas tags
const selectAllTag = async () => {
    let sql = `SELECT * FROM tbl_tag ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma tag pelo id
const selectByIdTag = async (id) => {
    let sql = `SELECT * FROM tbl_tag
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de tag
const deleteTag = async (id) => {
    let sql = `DELETE FROM tbl_tag
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertTag,
    updateTag,
    selectAllTag,
    selectByIdTag,
    deleteTag
}