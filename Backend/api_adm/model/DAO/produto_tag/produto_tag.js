/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoTag
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produtoTag
const insertProdutoTag = async (produtoTag) => {
    let sql = `INSERT INTO tbl_produto_tag (id_produto, id_tag)
               VALUES (${produtoTag.id_produto}, ${produtoTag.id_tag})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de produtoTag
const updateProdutoTag = async (produtoTag) => {
    let sql = `UPDATE tbl_produto_tag
               SET id_produto  = ${produtoTag.id_produto},
                   id_tag = ${produtoTag.id_tag}
               WHERE id = ${produtoTag.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}

// select de todas produtoTag
const selectAllProdutoTag = async () => {
    let sql = `SELECT * FROM tbl_produto_tag ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoTag pelo id
const selectByIdProdutoTag = async (id) => {
    let sql = `SELECT * FROM tbl_produto_tag
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// delete de produtoTag
const deleteProdutoTag = async (id) => {
    let sql = `DELETE FROM tbl_produto_tag
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

// select de todos produtos buscando pelo id do tag
const selectProdutosByIdTag = async (IdTag) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_tag
                        ON tbl_produto.id = tbl_produto_tag.id_produto
                    INNER JOIN tbl_tag
                        ON tbl_tag.id = tbl_produto_tag.id_tag
               WHERE tbl_tag.id = ${IdTag}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos tages buscando pelo id do produto
const selectTagsByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_tag.*
               FROM tbl_tag
                    INNER JOIN tbl_produto_tag
                        ON tbl_tag.id = tbl_produto_tag.id_tag
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_tag.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os tages filtrando pelos Id do produto
const deleteTagsByIdProduto = async (idProduto) => {
    let sql = `DELETE FROM tbl_produto_tag
               WHERE id_produto = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertProdutoTag,
    updateProdutoTag,
    selectAllProdutoTag,
    selectByIdProdutoTag,
    deleteProdutoTag,
    selectProdutosByIdTag,
    selectTagsByIdProduto,
    deleteTagsByIdProduto
}