/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const db = require('../db/connection');

const getAll = () => {
  const resultado = new Promise((resolve, reject) => {
    try {
      db.connection.query('SELECT idusuario_web, dsnombre_completo, dscorreo_electronico, activo, femodificacion FROM usuarios_web',
        (error, result) => {
          if (error) return reject('Error, en el servidor al intentar consultar usuarios.');
          if (result.length === 0) return reject('Error, No hay registros para mostrar.');
          resolve(result);
        });
    } catch (error) {
      reject(error);
    }
  });
  return resultado;
};

const create = (req) => {
  const resultado = new Promise((resolve, reject) => {
    // console.log('valor de data', req);
    try {
      // db.connection.query('INSERT INTO usuarios_web (dsnombre_completo, dscorreo_electronico, activo)  VALUES  (?,?,?)', [req.dsnombre_completo, req.dscorreo_electronico, req.activo],
      const sql = 'INSERT INTO usuarios_web set ?';
      db.connection.query(sql, req, (error, resul) => {
        if (error) return reject('Error, En el servidor al intentar guardar usuario.');
        // console.log('error desde el modelo :', error);
        const userCreate = { id: resul.insertId, ...req };
        resolve(userCreate);
        // const userCreate = Object.assign({}, { id: resul.insertId }, req.usuario);
      });
    } catch (error) {
      reject(`Error, No se pudo guardar el usuario ${req.dsnombre_completo}.`);
    }
  });
  return resultado;
};

const update = (id, req) => {
  // const sql = `UPDATE usuarios_web   ${req}  WHERE idusuario_web = ${id}`;
  // console.log(sql);
  const resultado = new Promise((resolve, reject) => {
    try {
      const sql = 'UPDATE usuarios_web set ?  WHERE idusuario_web = ?';
      db.connection.query(sql, [req, id], (err, resul) => {
        if (err) return reject(err);

        if (resul.affectedRows > 0) return resolve(resul);
      });
    } catch (error) {
      reject(`Error, No se pudo actualizar el usuario con id ${id}.`);
    }
  });
  return resultado;
};

const remove = (id) => {
  const resultado = new Promise((resolve, reject) => {
    try {
      const sql = 'DELETE FROM  usuarios_web  WHERE idusuario_web  = ?';
      db.connection.query(sql, id, (err, result) => {
        if (err) return reject('Error, En el servidor al intentar borrar usuario.');
        if (result.affectedRows === 0) return reject(`Error, no Existe ususario con id ${id}.`);

        resolve(result);
      });
    } catch (error) {
      reject('Error al intentar borrar usuario.');
    }
  });
  return resultado;
};

const userId = (id) => {
  const resultado = new Promise((resolve, reject) => {
    try {
      const sql = 'SELECT  idusuario_web  id, dsnombre_completo, dscorreo_electronico, activo, femodificacion FROM usuarios_web WHERE idusuario_web = ? ';
      db.connection.query(sql, id, (err, result) => {
        if (err) return reject('Error, En el servidor al intentar consultar usuario.');

        if (result[0].id <= 0) return reject('Error, No existe el usuario con id .');

        resolve(result);
      });
    } catch (error) {
      console.log('no se', error);
      reject('Error, al intentar consultar usuario.');
    }
  });
  return resultado;
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  userId,
};
