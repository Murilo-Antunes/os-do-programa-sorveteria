/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoIngrediente
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produtoIngrediente
const insertProdutoIngrediente = async (produtoIngrediente) => {
    let sql = `INSERT INTO tbl_produto_ingrediente (id_produto, id_ingrediente)
               VALUES (${produtoIngrediente.id_produto}, ${produtoIngrediente.id_ingrediente})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de produtoIngrediente
const updateProdutoIngrediente = async (produtoIngrediente) => {
    let sql = `UPDATE tbl_produto_ingrediente
               SET id_produto  = ${produtoIngrediente.id_produto},
                   id_ingrediente = ${produtoIngrediente.id_ingrediente}
               WHERE id = ${produtoIngrediente.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}

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

// delete de produtoIngrediente
const deleteProdutoIngrediente = async (id) => {
    let sql = `DELETE FROM tbl_produto_ingrediente
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
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

// função para excluir os ingredientees filtrando pelos Id do produto
const deleteIngredientesByIdProduto = async (idProduto) => {
    let sql = `DELETE FROM tbl_produto_ingrediente
               WHERE id_produto = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertProdutoIngrediente,
    updateProdutoIngrediente,
    selectAllProdutoIngrediente,
    selectByIdProdutoIngrediente,
    deleteProdutoIngrediente,
    selectProdutosByIdIngrediente,
    selectIngredientesByIdProduto,
    deleteIngredientesByIdProduto
}