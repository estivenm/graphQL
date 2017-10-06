/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

module.exports = `
 # definiendo Curso
   type Curso {
    id: ID!
    titulo: String!
    descripcion:String!
    profesor:Profesor
    rating:Float
    comentarios:[Comentario]
  }

  # definiendo comentarios
  type Comentario{
    id:ID!
    nombre:String!
    cuerpo:String!

  }

`;
