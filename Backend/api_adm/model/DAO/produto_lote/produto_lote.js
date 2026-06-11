/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoLote
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produtoLote
const insertProdutoLote = async (produtoLote) => {
    let sql = `INSERT INTO tbl_produto_lote (id_produto, id_lote)
               VALUES (${produtoLote.id_produto}, ${produtoLote.id_lote})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de produtoLote
const updateProdutoLote = async (produtoLote) => {
    let sql = `UPDATE tbl_produto_lote
               SET id_produto  = ${produtoLote.id_produto},
                   id_lote = ${produtoLote.id_lote}
               WHERE id = ${produtoLote.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}

// select de todas produtoLotes
const selectAllProdutoLote = async () => {
    let sql = `SELECT * FROM tbl_produto_lote ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoLote pelo id
const selectByIdProdutoLote = async (id) => {
    let sql = `SELECT * FROM tbl_produto_lote
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// delete de produtoLote
const deleteProdutoLote = async (id) => {
    let sql = `DELETE FROM tbl_produto_lote
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

// select de todos produtos buscando pelo id do lote
const selectProdutosByIdLote = async (idLote) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_lote
                        ON tbl_produto.id = tbl_produto_lote.id_produto
                    INNER JOIN tbl_lote
                        ON tbl_lote.id = tbl_produto_lote.id_lote
               WHERE tbl_lote.id = ${idLote}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos lotees buscando pelo id do produto
const selectLotesByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_lote.*
               FROM tbl_lote
                    INNER JOIN tbl_produto_lote
                        ON tbl_lote.id = tbl_produto_lote.id_lote
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_lote.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os lotees filtrando pelos Id do produto
const deleteLotesByIdProduto = async (idProduto) => {
    let sql = `DELETE FROM tbl_produto_lote
               WHERE id_produto = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertProdutoLote,
    updateProdutoLote,
    selectAllProdutoLote,
    selectByIdProdutoLote,
    deleteProdutoLote,
    selectProdutosByIdLote,
    selectLotesByIdProduto,
    deleteLotesByIdProduto
}