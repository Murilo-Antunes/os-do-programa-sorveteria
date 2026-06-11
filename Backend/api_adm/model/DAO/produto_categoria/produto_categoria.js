/*********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produtoCategoria
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * ******************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produtoCategoria
const insertProdutoCategoria = async (produtoCategoria) => {
    let sql = `INSERT INTO tbl_produto_categoria (id_produto, id_categoria)
               VALUES (${produtoCategoria.id_produto}, ${produtoCategoria.id_categoria})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de produtoCategoria
const updateProdutoCategoria = async (produtoCategoria) => {
    let sql = `UPDATE tbl_produto_categoria
               SET id_produto  = ${produtoCategoria.id_produto},
                   id_categoria = ${produtoCategoria.id_categoria}
               WHERE id = ${produtoCategoria.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}

// select de todas produtoCategorias
const selectAllProdutoCategoria = async () => {
    let sql = `SELECT * FROM tbl_produto_categoria ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produtoCategoria pelo id
const selectByIdProdutoCategoria = async (id) => {
    let sql = `SELECT * FROM tbl_produto_categoria
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// delete de produtoCategoria
const deleteProdutoCategoria = async (id) => {
    let sql = `DELETE FROM tbl_produto_categoria
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

// select de todos produtos buscando pelo id do categoria
const selectProdutosByIdCategoria = async (idCategoria) => {
    let sql = `SELECT tbl_produto.*
               FROM tbl_produto
                    INNER JOIN tbl_produto_categoria
                        ON tbl_produto.id = tbl_produto_categoria.id_produto
                    INNER JOIN tbl_categoria
                        ON tbl_categoria.id = tbl_produto_categoria.id_categoria
               WHERE tbl_categoria.id = ${idCategoria}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos categoriaes buscando pelo id do produto
const selectCategoriasByIdProduto = async (idProduto) => {
    let sql = `SELECT tbl_categoria.*
               FROM tbl_categoria
                    INNER JOIN tbl_produto_categoria
                        ON tbl_categoria.id = tbl_produto_categoria.id_categoria
                    INNER JOIN tbl_produto
                        ON tbl_produto.id = tbl_produto_categoria.id_produto
               WHERE tbl_produto.id = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os categoriaes filtrando pelos Id do produto
const deleteCategoriasByIdProduto = async (idProduto) => {
    let sql = `DELETE FROM tbl_produto_categoria
               WHERE id_produto = ${idProduto}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertProdutoCategoria,
    updateProdutoCategoria,
    selectAllProdutoCategoria,
    selectByIdProdutoCategoria,
    deleteProdutoCategoria,
    selectProdutosByIdCategoria,
    selectCategoriasByIdProduto,
    deleteCategoriasByIdProduto
}