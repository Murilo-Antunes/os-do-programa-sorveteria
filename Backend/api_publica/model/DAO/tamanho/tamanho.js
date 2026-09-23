/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela tamanho
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

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

module.exports = {
    selectAllTamanho,
    selectByIdTamanho
}