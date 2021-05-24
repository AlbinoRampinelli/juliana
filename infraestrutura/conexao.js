const mysql = require('mysql');
const config = require('../config/default.json')

const conexao = mysql.createConnection({
    user: config.env.MYSQL_USER,
    password: config.env.MYSQL_PASSWORD,
    database: config.env.MYSQL_DATABASE,
    host: config.env.MYSQL_HOST,
    port: config.env.MYSQL_PORT 
   
})

module.exports = conexao;
