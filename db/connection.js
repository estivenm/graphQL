/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection(config.db);

connection.connect((error) => {
  if (error) return error;
  console.info(`conexion correcta con la bd ${config.db.database} corriendo en el puerto ${config.db.port}`);
  return null;
});

// exports.connection = connection;
module.exports = { connection };
