    /*********************************************************************************************************
     * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produtoCategoria
     * Data: 09/06/2026
     * Autor: Julio Augusto
     * Versão: 1.0
     * *******************************************************************************************************/

    const config_message = require('../module/configMessages.js')
    const produtoCategoriaDAO = require('../../model/DAO/produto_categoria/produto_categoria.js')

    // inserir novo produtoCategoria
    const inserirNovoProdutoCategoria = async (produtoCategoria, contentType) => {
        let message = JSON.parse(JSON.stringify(config_message))
        try {

            let validar = await validarDados(produtoCategoria, contentType)
            if(validar) return validar

            let result = await produtoCategoriaDAO.insertProdutoCategoria(produtoCategoria)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

            produtoCategoria.id = result
            return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produtoCategoria)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }

    // atualizar produtoCategoria
    const atualizarProdutoCategoria = async (produtoCategoria, id, contentType) => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {
            let validar = await validarDados(produtoCategoria, contentType)
            if(validar) return validar

            let resultBuscarId = await buscarProdutoCategoria(id)
            if(!resultBuscarId.status) return resultBuscarId // 400 e 404

            produtoCategoria.id = Number(id)
            let result = await produtoCategoriaDAO.updateProdutoCategoria(produtoCategoria)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produtoCategoria)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    // listar todas produtoCategoriaes
    const listarProdutoCategoria = async () => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {
            let result = await produtoCategoriaDAO.selectAllProdutoCategoria()

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            // verfica se o array é vazio
            if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

            let listarProdutoCategoriaMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
            message.DEFAULT_MESSAGE.response.count = result.length

            return listarProdutoCategoriaMessage // status_code 200

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    // buscar produtoCategoria pelo id
    const buscarProdutoCategoria = async (id) => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {

        const validarID = await validarId(id)
        if(validarID) return validarID

            let result = await produtoCategoriaDAO.selectByIdProdutoCategoria(id)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            if(result.length < 1) return config_message.ERROR_NOT_FOUND

            return await montarMensagem(message, message.SUCESS_RESPONSE, result)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    // excluir produtoCategoria pelo id
    const excluirProdutoCategoria = async (id) => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {

            let resultBuscarId = await buscarProdutoCategoria(id)
            if(!resultBuscarId.status) return resultBuscarId // 400 e 404

            let result = await produtoCategoriaDAO.deleteProdutoCategoria(id)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    // buscar produtos pelo id do categoria
    const buscarProdutosIdCategoria = async (idCategoria) => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {

        const validarID = await validarId(idCategoria)
        if(validarID) return validarID

            let result = await produtoCategoriaDAO.selectProdutosByIdCategoria(idCategoria)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            if(result.length < 1) return config_message.ERROR_NOT_FOUND

            return await montarMensagem(message, message.SUCESS_RESPONSE, result)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    // buscar categoriaes pelo id do produto
    const buscarCategoriasIdProduto = async (idProduto) => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {

        const validarID = await validarId(idProduto)
        if(validarID) return validarID

            let result = await produtoCategoriaDAO.selectCategoriasByIdProduto(idProduto)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            if(result.length < 1) return config_message.ERROR_NOT_FOUND

            return await montarMensagem(message, message.SUCESS_RESPONSE, result)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    // excluir categoriaes relacionados ao produto
    const excluirCategoriasIdProduto = async (idProduto) => {
        let message = JSON.parse(JSON.stringify(config_message))

        try {
            let result = await produtoCategoriaDAO.deleteCategoriasByIdProduto(idProduto)

            if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

            return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

        } catch (error) {console.log(error)}
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

    const validarId = async (id) => {
        let message = JSON.parse(JSON.stringify(config_message))
        
        if(id == undefined || id == '' || id == null || id <= 0 || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }

        return false
    }

    const validarDados = async (produtoCategoria, contentType) => {
        let message = JSON.parse(JSON.stringify(config_message))

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
        
        if(produtoCategoria.id_produto == undefined || produtoCategoria.id_produto == '' || produtoCategoria.id_produto == null || produtoCategoria.id_produto <= 0 || isNaN(produtoCategoria.id_produto)){
            message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }

        if(produtoCategoria.id_categoria == undefined || produtoCategoria.id_categoria == '' || produtoCategoria.id_categoria == null || produtoCategoria.id_categoria <= 0 || isNaN(produtoCategoria.id_categoria)){
            message.ERROR_BAD_REQUEST.field = '[ID_CATEGORIA] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }

        return false
    }

    const montarMensagem = async (base,status,response = null) => {
        base.DEFAULT_MESSAGE.status = status.status
        base.DEFAULT_MESSAGE.status_code = status.status_code
        base.DEFAULT_MESSAGE.message = status.message

        if(response != null) base.DEFAULT_MESSAGE.response.produtoCategoria = response

        return base.DEFAULT_MESSAGE // 200 ou 201
    }

    module.exports = {
        inserirNovoProdutoCategoria,
        atualizarProdutoCategoria,
        listarProdutoCategoria,
        buscarProdutoCategoria,
        excluirProdutoCategoria,
        buscarProdutosIdCategoria,
        buscarCategoriasIdProduto,
        excluirCategoriasIdProduto
    }