/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoTamanho
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// select de todas produtoTamanho
const selectAllProdutoTamanho = async () => {
    let sql = `SELECT * FROM tbl_produto_tamanho ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoTamanho pelo id
const selectByIdProdutoTamanho = async (id) => {
    let sql = `SELECT * FROM tbl_produto_tamanho
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// select de todos produtos buscando pelo id do tamanho
const selectProdutosByIdTamanho = async (IdTamanho) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_tamanho
                        ON tbl_produto.id = tbl_produto_tamanho.id_produto
                    INNER JOIN tbl_tamanho
                        ON tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
               WHERE tbl_tamanho.id = ${IdTamanho}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos tamanhoes buscando pelo id do produto
const selectTamanhosByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_tamanho.*
               FROM tbl_tamanho
                    INNER JOIN tbl_produto_tamanho
                        ON tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_tamanho.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    selectAllProdutoTamanho,
    selectByIdProdutoTamanho,
    selectProdutosByIdTamanho,
    selectTamanhosByIdProduto
}