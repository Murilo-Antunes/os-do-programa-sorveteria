/*****************************************************
 * Objetivo: Arquivo responsável pela pesquisa no DAO
 * Data: 11/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ***************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// pesquisa de produtos 
const selectByNomeProduto = async (nomeProduto) => {
    let sql = ` SELECT id FROM tbl_produto
                WHERE nome LIKE '%${nomeProduto}%'`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {selectByNomeProduto}