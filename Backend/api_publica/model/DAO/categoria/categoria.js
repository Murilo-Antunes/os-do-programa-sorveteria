/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela categoria
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)




// select de todas categorias
const selectAllCategoria = async () => {
    let sql = `SELECT * FROM tbl_categoria ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma categoria pelo id
const selectByIdCategoria = async (id) => {
    let sql = `SELECT * FROM tbl_categoria
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}


module.exports = {
  
    selectAllCategoria,
    selectByIdCategoria
}