/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

module.exports = `
type Profesor {
    id:ID!
    nombre:String!
    nacionalidad:String!
    genero:Genero
    cursos:[Curso]
  }

  enum Genero{
    MASCULINO
    FEMENINO
  }

`;

