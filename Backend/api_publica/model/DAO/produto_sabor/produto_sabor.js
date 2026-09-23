/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoSabor
 * Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

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

module.exports = {
    selectAllProdutoSabor,
    selectByIdProdutoSabor,
    selectProdutosByIdSabor,
    selectSaboresByIdProduto
}