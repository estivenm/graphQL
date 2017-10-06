/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { UserError } = require('graphql-errors');
const userModel = require('./models/usuarios.js');

// datos  estacticos para las entidades
const resolvers = {
  // llamar type Query
  Query: {
    cursos: () => [{
      id: 1,
      titulo: 'Aprediendo graphql',
      descripcion: 'estoy es pero motivado para apreder graphql y muchas cosas mas',
    }, {
      id: 2,
      titulo: 'Aprediendo graphql con node js',
      descripcion: 'estoy motivado',
    }],
    usuario: () => userModel.getAll().then((res) => { console.log('resultado get all es', res); return res; }).catch((err) => {
      throw new UserError(err);
    }),
    usuarioid: (rootValue, args) => userModel.userId(args.id)
      .then(data =>
        data).catch((err) => {
          // console.log(err);
          throw new UserError(err);
        }),
    profesores: () => [{
      id: 1,
      nombre: 'profesor prueba',
      nacionalidad: 'nacionalidad prueba',
    }],
  },
  // llamar type Curso -> profesor add sus valores correspondientes
  Curso: {
    profesor: () => ({
      // id:1,
      nombre: 'Matias Mazo',
      nacionalidad: 'COLOMBIA',
    }),
    // llamar type Curso-> Comentario add sus valores correspondientes
    comentarios: () => [{
      id: 1,
      nombre: 'Juan Mazo',
      cuerpo: 'mensaje de comentario',
    }, {
      id: 2,
      nombre: 'Estiven Mazo',
      cuerpo: 'mensaje de comentario para platzi',
    }],
  },

  Mutation: {
    usuarioAdd: (_, args) => userModel.create(args.usuario)
      .then(resul => resul).catch((err) => {
        throw new UserError(err);
      }),
    usuarioEdit: (_, args) => userModel.update(args.usuarioId, args.usuario)
      .then(data => data).catch((err) => {
        throw new UserError(err);
      }),
    usuarioRemove: (_, args) => userModel.remove(args.usuarioId)
      .then((data) => {
        console.log('------------------------------------');
        console.log(data);
        console.log('------------------------------------');
      }).catch((err) => {
        console.log('------------------------------------');
        console.log(err);
        console.log('------------------------------------');
        throw new UserError(err);
      }),
  },
};

module.exports = resolvers;
