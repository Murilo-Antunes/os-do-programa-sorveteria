/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoTag
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

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

module.exports = {
    selectAllProdutoTag,
    selectByIdProdutoTag,
    selectProdutosByIdTag,
    selectTagsByIdProduto
}