/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoSabor
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produtoSabor
const insertProdutoSabor = async (produtoSabor) => {
    let sql = `INSERT INTO tbl_produto_sabor (id_produto, id_sabor)
               VALUES (${produtoSabor.id_produto}, ${produtoSabor.id_sabor})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de produtoSabor
const updateProdutoSabor = async (produtoSabor) => {
    let sql = `UPDATE tbl_produto_sabor
               SET id_produto  = ${produtoSabor.id_produto},
                   id_sabor = ${produtoSabor.id_sabor}
               WHERE id = ${produtoSabor.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}

// select de todas produtoSabor
const selectAllProdutoSabor = async () => {
    let sql = `SELECT * FROM tbl_produto_sabor ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoSabor pelo id
const selectByIdProdutoSabor = async (id) => {
    let sql = `SELECT * FROM tbl_produto_sabor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// delete de produtoSabor
const deleteProdutoSabor = async (id) => {
    let sql = `DELETE FROM tbl_produto_sabor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

// select de todos produtos buscando pelo id do sabor
const selectProdutosByIdSabor = async (idSabor) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_sabor
                        ON tbl_produto.id = tbl_produto_sabor.id_produto
                    INNER JOIN tbl_sabor
                        ON tbl_sabor.id = tbl_produto_sabor.id_sabor
               WHERE tbl_sabor.id = ${idSabor}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos sabores buscando pelo id do produto
const selectSaboresByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_sabor.*
               FROM tbl_sabor
                    INNER JOIN tbl_produto_sabor
                        ON tbl_sabor.id = tbl_produto_sabor.id_sabor
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_sabor.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os sabores filtrando pelos Id do produto
const deleteSaboresByIdProduto = async (idProduto) => {
    let sql = `DELETE FROM tbl_produto_sabor
               WHERE id_produto = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertProdutoSabor,
    updateProdutoSabor,
    selectAllProdutoSabor,
    selectByIdProdutoSabor,
    deleteProdutoSabor,
    selectProdutosByIdSabor,
    selectSaboresByIdProduto,
    deleteSaboresByIdProduto
}