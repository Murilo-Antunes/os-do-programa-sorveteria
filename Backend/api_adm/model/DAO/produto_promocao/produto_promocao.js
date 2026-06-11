/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoPromocao
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produtoPromocao
const insertProdutoPromocao = async (produtoPromocao) => {
    let sql = `INSERT INTO tbl_produto_promocao (id_produto, id_promocao)
               VALUES (${produtoPromocao.id_produto}, ${produtoPromocao.id_promocao})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de produtoPromocao
const updateProdutoPromocao = async (produtoPromocao) => {
    let sql = `UPDATE tbl_produto_promocao
               SET id_produto  = ${produtoPromocao.id_produto},
                   id_promocao = ${produtoPromocao.id_promocao}
               WHERE id = ${produtoPromocao.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}

// select de todas produtoPromocao
const selectAllProdutoPromocao = async () => {
    let sql = `SELECT * FROM tbl_produto_promocao ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoPromocao pelo id
const selectByIdProdutoPromocao = async (id) => {
    let sql = `SELECT * FROM tbl_produto_promocao
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// delete de produtoPromocao
const deleteProdutoPromocao = async (id) => {
    let sql = `DELETE FROM tbl_produto_promocao
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

// select de todos produtos buscando pelo id do promocao
const selectProdutosByIdPromocao = async (idPromocao) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_promocao
                        ON tbl_produto.id = tbl_produto_promocao.id_produto
                    INNER JOIN tbl_promocao
                        ON tbl_promocao.id = tbl_produto_promocao.id_promocao
               WHERE tbl_promocao.id = ${idPromocao}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos promocaoes buscando pelo id do produto
const selectPromocoesByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_promocao.*
               FROM tbl_promocao
                    INNER JOIN tbl_produto_promocao
                        ON tbl_promocao.id = tbl_produto_promocao.id_promocao
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_promocao.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os promocaoes filtrando pelos Id do produto
const deletePromocoesByIdProduto = async (idProduto) => {
    let sql = `DELETE FROM tbl_produto_promocao
               WHERE id_produto = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertProdutoPromocao,
    updateProdutoPromocao,
    selectAllProdutoPromocao,
    selectByIdProdutoPromocao,
    deleteProdutoPromocao,
    selectProdutosByIdPromocao,
    selectPromocoesByIdProduto,
    deletePromocoesByIdProduto
}