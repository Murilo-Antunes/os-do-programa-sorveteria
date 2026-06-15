/***************************************************************************
 * Objetivo: Arquivo responsável por configurar conexão com o banco de dados
 * Autor: Julio Augusto
 * Data: 09/06/2026
 * Versão: 1.0.0
 ***************************************************************************/

module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: 'thomas.proxy.rlwy.net',
        user: 'root', // Substitua pelo seu usuário
        password: 'RSpNFqYicdCfeAuvQtPwwzJRczOStIqC', // Substitua pela sua senha
        database: 'db_sorvetudos_2026',
        port: 52051, // Porta padrão do MySQL
       
        // Opcional: Define charset (recomendado para UTF8)
        charset: 'utf8mb4'
      },
     
      // Configurações de Migração
      migrations: {
        tableName: 'knex_migrations', // Nome da tabela de migrações
        directory: './src/db/migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    },
   
    // Você pode adicionar configurações para produção, testes, etc.
};