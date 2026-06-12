/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela configuração 
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

// Import do arquivo de configuração da Azure
const AZURE = require('../module/config_upload_azure.js')

// Import da dependencia para realizar um requisição http pelo node
const fetch = require('node-fetch').default

const uploadFiles = async (file) => {
    // concatena no nome do arquivo a data e a hora
    let fileName = Date.now() + file.originalname

    // URL para enviar para o banco de dados
    let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`

    // URL para enviar o arquivo para o container da Azure
    let urlFileToken = `${urlFile}?${AZURE.TOKEN}`

    // faz a requisição
    let response = await fetch(urlFileToken, {
        method: 'PUT',
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type'  : 'application/octet-stream'
        },
        body: file.buffer
    })

    if(response.status == 201) return urlFile

    return false
}

module.exports = {uploadFiles}