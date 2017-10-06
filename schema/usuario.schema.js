/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

module.exports = `
type Usuario{
    id:Int
    dsnombre_completo: String!
    dscorreo_electronico: String!
    activo: String!
    femodificacion:String!
  }

  input NuevoUsuario{
    dsnombre_completo: String!,
    dscorreo_electronico: String!,
    activo: String!
  }

  input EditarUsuario {
    dsnombre_completo: String!,
    dscorreo_electronico: String!,
  }

`;
