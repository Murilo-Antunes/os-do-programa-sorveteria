/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produto
* Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// select de todas produtos
const selectAllProduto = async () => {
    let sql = `SELECT * FROM tbl_produto WHERE status = 1 ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produto pelo id
const selectByIdProduto = async (id) => {
    let sql = `SELECT * FROM tbl_produto
               WHERE id = ${id} AND status = 1`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}

module.exports = {
    selectAllProduto,
    selectByIdProduto
}