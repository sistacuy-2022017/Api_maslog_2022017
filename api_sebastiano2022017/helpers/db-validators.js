const Usuario = require('../models/usuario');


const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`el mail ${correo} ya se fue registrado`);
    } 

}


const esRolValido = async (role='') => {
    const existeRol = await role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

const existeUsuarioById = async (id='') => {
    const existeUsuario = await Usuario.findOne({id});

    if(existeUsuario){
        throw new Error(`el usuario con el ${id} no existe`);
    }

}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido
}