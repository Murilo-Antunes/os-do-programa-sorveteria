/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela produto
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de produto
const insertProduto = async (produto) => {
    let sql = `INSERT INTO tbl_produto (
                                        nome,
                                        descricao,
                                        preco,
                                        status,
                                        img
                                        )
               VALUES ('${produto.nome}',
                       '${produto.descricao}',
                       ${produto.preco},
                       ${produto.status},
                       '${produto.img}'
                        )`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {console.log(error)}

    return false
}

// update de produto
const updateProduto = async (produto) => {
    let sql = `UPDATE tbl_produto
               SET  nome = '${produto.nome}',
                    descricao = '${produto.descricao}',
                    preco = ${produto.preco},
                    status = ${produto.status},
                    img = '${produto.img}'
               WHERE id = ${produto.id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {console.log(error)}

    return false
}
// select de todas produtos
const selectAllProduto = async () => {
    let sql = `SELECT * FROM tbl_produto ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma produto pelo id
const selectByIdProduto = async (id) => {
    let sql = `SELECT * FROM tbl_produto
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de produto
const deleteProduto = async (id) => {
    let sql = `DELETE FROM tbl_produto
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertProduto,
    updateProduto,
    selectAllProduto,
    selectByIdProduto,
    deleteProduto
}