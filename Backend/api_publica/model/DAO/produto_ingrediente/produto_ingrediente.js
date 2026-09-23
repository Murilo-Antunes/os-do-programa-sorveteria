/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoIngrediente
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// select de todas produtoIngredientes
const selectAllProdutoIngrediente = async () => {
    let sql = `SELECT * FROM tbl_produto_ingrediente ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoIngrediente pelo id
const selectByIdProdutoIngrediente = async (id) => {
    let sql = `SELECT * FROM tbl_produto_ingrediente
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

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
    selectAllProdutoIngrediente,
    selectByIdProdutoIngrediente,
    selectProdutosByIdIngrediente,
    selectIngredientesByIdProduto
}