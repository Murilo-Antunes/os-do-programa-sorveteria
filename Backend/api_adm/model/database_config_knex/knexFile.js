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
        host: 'localhost',
        user: 'root', // Substitua pelo seu usuário
        password: 'bcd127', // Substitua pela sua senha
        database: 'db_sorvetudos_2026',
        port: 3306, // Porta padrão do MySQL

        // Opcional: Define charset (recomendado para UTF8)
        charset: 'utf8mb4'
      },

      // Configurações de Migração
      migrations: {
        tableName: 'knex_migrations', // Nome da tabela de migrações
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    },
}


// module.exports = {
//     development: {
//       client: 'mysql2',
//       connection: {
//         host: 'localhost',
//         user: 'root', // Substitua pelo seu usuário
//         password: 'bcd127', // Substitua pela sua senha
//         password: 'Antunes178987123', // Substitua pela sua senha
//         database: 'db_sorvetudos_2026',
//         port: 3306, // Porta padrão do MySQL

//         // Opcional: Define charset (recomendado para UTF8)
//         charset: 'utf8mb4'
//       },

//       // Configurações de Migração
//       migrations: {
//         tableName: 'knex_migrations', // Nome da tabela de migrações
//         directory: './db/migrations'
//       },
//       seeds: {
//         directory: './db/seeds'
//       }
//     },