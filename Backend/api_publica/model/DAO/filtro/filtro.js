/*****************************************************
 * Objetivo: Arquivo responsável pelo filtro no DAO
 ** Autor: Juan Carlos
 * data: 11/06/2026
 * Versão: 1.0.5.26
 * ***************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// filtro de produtos 
const selectByFiltro = async (filtro) => {
    let sql = `call filtro( ${filtro.idProduto},
                            ${filtro.idCategoria},
                            ${filtro.idSabor},
                            ${filtro.idTamanho},
                            ${filtro.idIngrediente},
                            ${filtro.idTag})`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0][0]
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {selectByFiltro}