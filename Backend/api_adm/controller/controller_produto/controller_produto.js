/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de produto
 * Data: 09/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/
const config_message = require('../module/configMessages.js')
const produtoDAO = require('../../model/DAO/produto/produto.js')
const UPLOAD = require('../upload/controller_upload_azure.js')

// import das controllers
const controllerProdutoCategoria = require('./controller_produto_categoria.js')
const controllerProdutoIngrediente = require('./controller_produto_ingrediente.js')
const controllerProdutoLote = require('./controller_produto_lote.js')
const controllerProdutoPromocao = require('./controller_produto_promocao.js')
const controllerProdutoSabor = require('./controller_produto_sabor.js')
const controllerProdutoTag = require('./controller_produto_tag.js')
const controllerProdutoTamanho = require('./controller_produto_tamanho.js')

// inserir nova produto
const inserirNovoProduto = async (produto, foto) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(produto)
        if(validar) return validar // 400 ou 415

        let urlFoto = await UPLOAD.uploadFiles(foto)

        if(!urlFoto){
            message.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }

        produto.img = urlFoto
        let result = await produtoDAO.insertProduto(produto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL
        produto.id = result

        // Manipulação de dados para inserir as categorias no produto
        for(categoria of produto.categoria){
            let produtoCategoria = { "id_produto": produto.id, "id_categoria": categoria.id}

            let resultInsertCategoria = await controllerProdutoCategoria.inserirNovoProdutoCategoria(produtoCategoria, 'application/json')
            
            if(!resultInsertCategoria.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        // Manipulação de dados para inserir os ingredientes no produto
        for(ingrediente of produto.ingrediente){
            let produtoIngrediente = { "id_produto": produto.id, "id_ingrediente": ingrediente.id}

            let resultInsertIngrediente = await controllerProdutoIngrediente.inserirNovoProdutoIngrediente(produtoIngrediente, 'application/json')

            if(!resultInsertIngrediente.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        // Manipulação de dados para inserir os lotes no produto
        for(lote of produto.lote){
            let produtoLote = { "id_produto": produto.id, "id_lote": lote.id}

            let resultInsertLote = await controllerProdutoLote.inserirNovoProdutoLote(produtoLote, 'application/json')

            if(!resultInsertLote.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        // Manipulação de dados para inserir as promoções no produto
        for(promocao of produto.promocao){
            let produtoPromocao = { "id_produto": produto.id, "id_promocao": promocao.id}

            let resultInsertPromocao = await controllerProdutoPromocao.inserirNovoProdutoPromocao(produtoPromocao, 'application/json')

            if(!resultInsertPromocao.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        // Manipulação de dados para inserir os sabores no produto
        for(sabor of produto.sabor){
            let produtoSabor = { "id_produto": produto.id, "id_sabor": sabor.id}

            let resultInsertSabor = await controllerProdutoSabor.inserirNovoProdutoSabor(produtoSabor, 'application/json')

            if(!resultInsertSabor.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        // Manipulação de dados para inserir as tags no produto
        for(tag of produto.tag){
            let produtoTag = { "id_produto": produto.id, "id_tag": tag.id}

            let resultInsertTag = await controllerProdutoTag.inserirNovoProdutoTag(produtoTag, 'application/json')

            if(!resultInsertTag.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        // Manipulação de dados para inserir as tags no produto
        for(tamanho of produto.tamanho){
            let produtoTamanho = { "id_produto": produto.id, "id_tamanho": tamanho.id}

            let resultInsertTamanho = await controllerProdutoTamanho.inserirNovoProdutoTamanho(produtoTamanho, 'application/json')

            if(!resultInsertTamanho.status)  return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, produto)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar produto
const atualizarProduto = async (produto, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produto, contentType)
        if(validar) return validar // 400 ou 415

        let resultBuscarId = await buscarProduto(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        produto.id = Number(id)
        let result = await produtoDAO.updateProduto(produto)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // Exclui e recria categorias
        let resultDeleteCategoria = await controllerProdutoCategoria.excluirCategoriasIdProduto(produto.id)

        if(resultDeleteCategoria.status){
            for(categoria of produto.categoria){
                let produtoCategoria = { "id_produto": produto.id, "id_categoria": categoria.id}

                let resultInsertCategoria = await controllerProdutoCategoria.inserirNovoProdutoCategoria(produtoCategoria, contentType)

                if(!resultInsertCategoria.status)  return message.SUCESS_CREATED_ITEM_WARNING
            }
        }

        // Exclui e recria ingredientes
        let resultDeleteIngrediente = await controllerProdutoIngrediente.excluirIngredientesIdProduto(produto.id)

        if(resultDeleteIngrediente.status){
            for(ingrediente of produto.ingrediente){
                let produtoIngrediente = { "id_produto": produto.id, "id_ingrediente": ingrediente.id}

                let resultInsertIngrediente = await controllerProdutoIngrediente.inserirNovoProdutoIngrediente(produtoIngrediente, contentType)

                if(!resultInsertIngrediente.status)  return message.SUCESS_CREATED_ITEM_WARNING
            }
        }

        // Exclui e recria lotes
        let resultDeleteLote = await controllerProdutoLote.excluirLotesIdProduto(produto.id)

        if(resultDeleteLote.status){
            for(lote of produto.lote){
                let produtoLote = { "id_produto": produto.id, "id_lote": lote.id}

                let resultInsertLote = await controllerProdutoLote.inserirNovoProdutoLote(produtoLote, contentType)

                if(!resultInsertLote.status)  return message.SUCESS_CREATED_ITEM_WARNING
            }
        }

        // Exclui e recria promoções
        let resultDeletePromocao = await controllerProdutoPromocao.excluirPromocoesIdProduto(produto.id)

        if(resultDeletePromocao.status){
            for(promocao of produto.promocao){
                let produtoPromocao = { "id_produto": produto.id, "id_promocao": promocao.id}

                let resultInsertPromocao = await controllerProdutoPromocao.inserirNovoProdutoPromocao(produtoPromocao, contentType)

                if(!resultInsertPromocao.status)  return message.SUCESS_CREATED_ITEM_WARNING
            }
        }

        // Exclui e recria sabores
        let resultDeleteSabor = await controllerProdutoSabor.excluirSaboresIdProduto(produto.id)

        if(resultDeleteSabor.status){
            for(sabor of produto.sabor){
                let produtoSabor = { "id_produto": produto.id, "id_sabor": sabor.id}

                let resultInsertSabor = await controllerProdutoSabor.inserirNovoProdutoSabor(produtoSabor, contentType)

                if(!resultInsertSabor.status)  return message.SUCESS_CREATED_ITEM_WARNING
            }
        }

        // Exclui e recria tags
        let resultDeleteTag = await controllerProdutoTag.excluirTagsIdProduto(produto.id)

        if(resultDeleteTag.status){
            for(tag of produto.tag){
                let produtoTag = { "id_produto": produto.id, "id_tag": tag.id}

                let resultInsertTag = await controllerProdutoTag.inserirNovoProdutoTag(produtoTag, contentType)

                if(!resultInsertTag.status)  return message.SUCESS_CREATED_ITEM_WARNING
            }
        }

         // Exclui e recria tamanhos
         let resultDeleteTamanho = await controllerProdutoTamanho.excluirTamanhosIdProduto(produto.id)

         if(resultDeleteTamanho.status){
             for(tamanho of produto.tamanho){
                 let produtoTamanho = { "id_produto": produto.id, "id_tamanho": tamanho.id}
 
                 let resultInsertTamanho = await controllerProdutoTamanho.inserirNovoProdutoTamanho(produtoTamanho, contentType)
 
                 if(!resultInsertTamanho.status)  return message.SUCESS_CREATED_ITEM_WARNING
             }
         }
 

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, produto)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas produtos
const listarProduto = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoDAO.selectAllProduto()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(produto of result){
            let categoria = await controllerProdutoCategoria.buscarCategoriasIdProduto(produto.id)
            if(categoria.status){
                produto.categoria = categoria.response.produtoCategoria
            }

            let ingrediente = await controllerProdutoIngrediente.buscarIngredientesIdProduto(produto.id)
            if(ingrediente.status){
                produto.ingrediente = ingrediente.response.produtoIngrediente
            }

            let lote = await controllerProdutoLote.buscarLotesIdProduto(produto.id)
            if(lote.status){
                produto.lote = lote.response.produtoLote
            }

            let promocao = await controllerProdutoPromocao.buscarPromocoesIdProduto(produto.id)
            if(promocao.status){
                produto.promocao = promocao.response.produtoPromocao
            }

            let sabor = await controllerProdutoSabor.buscarSaboresIdProduto(produto.id)
            if(sabor.status){
                produto.sabor = sabor.response.produtoSabor
            }

            let tag = await controllerProdutoTag.buscarTagsIdProduto(produto.id)
            if(tag.status){
                produto.tag = tag.response.produtoTag
            }

            let tamanho = await controllerProdutoTamanho.buscarTamanhosIdProduto(produto.id)
            if(tamanho.status){
                produto.tamanho = tamanho.response.produtoTamanho
            }
        }

        let listarProdutoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarProdutoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar produto pelo id
const buscarProduto = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await produtoDAO.selectByIdProduto(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        for(produto of result){
            let categoria = await controllerProdutoCategoria.buscarCategoriasIdProduto(produto.id)
            if(categoria.status){
                produto.categoria = categoria.response.produtoCategoria
            }

            let ingrediente = await controllerProdutoIngrediente.buscarIngredientesIdProduto(produto.id)
            if(ingrediente.status){
                produto.ingrediente = ingrediente.response.produtoIngrediente
            }

            let lote = await controllerProdutoLote.buscarLotesIdProduto(produto.id)
            if(lote.status){
                produto.lote = lote.response.produtoLote
            }

            let promocao = await controllerProdutoPromocao.buscarPromocoesIdProduto(produto.id)
            if(promocao.status){
                produto.promocao = promocao.response.produtoPromocao
            }

            let sabor = await controllerProdutoSabor.buscarSaboresIdProduto(produto.id)
            if(sabor.status){
                produto.sabor = sabor.response.produtoSabor
            }

            let tag = await controllerProdutoTag.buscarTagsIdProduto(produto.id)
            if(tag.status){
                produto.tag = tag.response.produtoTag
            }

            let tamanho = await controllerProdutoTamanho.buscarTamanhosIdProduto(produto.id)
            if(tamanho.status){
                produto.tamanho = tamanho.response.produtoTamanho
            }
        }

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir produto pelo id
const excluirProduto = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarProduto(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await produtoDAO.deleteProduto(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (produto, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    if(produto.nome == undefined || produto.nome == null || produto.nome == '' || produto.nome.length > 100 || typeof(produto.nome) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produto.descricao == undefined || produto.descricao == null || produto.descricao == '' || produto.descricao.length > 255 || typeof(produto.descricao) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produto.preco == undefined || produto.preco == null || produto.preco == '' || isNaN(produto.preco) || Number(produto.preco).toFixed(2).length > 6){
        message.ERROR_BAD_REQUEST.field = '[PREÇO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(produto.status == undefined || produto.status == null || produto.status == '' || isNaN(produto.status) || (Number(produto.status) != 0 && Number(produto.status) != 1)){
        message.ERROR_BAD_REQUEST.field = '[STATUS] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(!Array.isArray(produto.tamanho)){
        message.ERROR_BAD_REQUEST.field = '[TAMANHO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }
    
    if(!Array.isArray(produto.categoria)){
        message.ERROR_BAD_REQUEST.field = '[CATEGORIA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(!Array.isArray(produto.ingrediente)){
        message.ERROR_BAD_REQUEST.field = '[INGREDIENTE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(!Array.isArray(produto.lote)){
        message.ERROR_BAD_REQUEST.field = '[LOTE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(!Array.isArray(produto.promocao)){
        message.ERROR_BAD_REQUEST.field = '[PROMOÇÃO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(!Array.isArray(produto.sabor)){
        message.ERROR_BAD_REQUEST.field = '[SABOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(!Array.isArray(produto.tag)){
        message.ERROR_BAD_REQUEST.field = '[TAG] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const validarId = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    
    if(id == undefined || id == '' || id == null || id <= 0 || isNaN(id)){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.produto = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoProduto,
    atualizarProduto,
    listarProduto,
    buscarProduto,
    excluirProduto
}