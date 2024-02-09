const Login = require('../models/login');

const esLoginValido = async (correo='', constrasena= '') => {
    const existeRol = await correo.findOne({correo});
    const existeContrasena = await constrasena.findOne({constrasena});
    if(existeRol && existeContrasena){
        throw new Error(`bienvenido ${correo} su clave es: ${constrasena}` )
    }
}

module.exports = {
    esLoginValido
}