const mysql = require("mysql2");
const env = require("dotenv");

env.config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnection: true,
  connectionLimit: 50,
  queueLImit: 0,
};

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();
