/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoIngrediente
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// select de todos produtos buscando pelo id do ingrediente
const selectProdutosByIdIngrediente = async (idIngrediente) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_ingrediente
                        ON tbl_produto.id = tbl_produto_ingrediente.id_produto
                    INNER JOIN tbl_ingrediente
                        ON tbl_ingrediente.id = tbl_produto_ingrediente.id_ingrediente
               WHERE tbl_ingrediente.id = ${idIngrediente}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos ingredientees buscando pelo id do produto
const selectIngredientesByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_ingrediente.*
               FROM tbl_ingrediente
                    INNER JOIN tbl_produto_ingrediente
                        ON tbl_ingrediente.id = tbl_produto_ingrediente.id_ingrediente
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_ingrediente.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    selectProdutosByIdIngrediente,
    selectIngredientesByIdProduto
}