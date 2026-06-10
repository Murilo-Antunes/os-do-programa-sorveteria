/*******************************************************
 * Objetivo:  Arquivo responsavel pelo CRUD no banco de dados MySQL na tabela filme 
 * Autor: Juan Carlos 
 * Data: 11/06/2026
 * Versão: 1.0
 *******************************************************/

// Import da biblioteca para gerenciar o banco de dados Mysql no node.js
const  knex = require('knex')

//Import do arquivo de configuração para conexão com BD MySQL
const knexConfig = require('../../database_config_knex/knexFile')

//Criar a conexão com o banco de dados MySql
const knexConex = knex(knexConfig.development)




// Função para reornar todos os dados da tabela de produto 
const selectAllProduto = async function() {
    try {

        //Script para retornar todos os filmes 
        let sql =  `select * from tbl_produto order by id desc ` 
        
        //execulta no banco de Dados o script SQL para retornar os filmes
        let result = await knexConex.raw(sql)

        //Validação para verificar se o retorno no Bd é um Array
        //Se o scriptSQL de erro, o banco não devolve um array 
        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


//Função para retornar os dados do produto Filtrando pelo ID 
 const selectByIdProduto = async function(id) {
    try {
        let sql = `select * from tbl_produto where id= ${id}`
        
        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }


    } catch (error) {
        return false
    }
 }

 const selectByProdutoNome = async function(nomeProduto) {
    try {
        let sql = `select * from tbl_produto where nome= ${nomeProduto}`
        
        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }


    } catch (error) {
        return false
    }
 }


 const selectbyFiltro = async function(filtro) {
    try {
        let sql = `call filtro(${filtro.idProduto},${filtro.idCategoria},${filtro.idSabor},${filtro.idPromocao},${filtro.idTamanho},${filtro.idLote},${filtro.idIngrediente}, ${filtro.idTag}) `
        
        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }


    } catch (error) {
        return false
    }
 }


//call filtro(3,3,3,3,3,3,3,3);


 module.exports = {

    selectAllProduto,
    selectByIdProduto,
    selectByProdutoNome,
    selectbyFiltro
 }