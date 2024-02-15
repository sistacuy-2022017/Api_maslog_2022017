const Usuario = require("../models/usuario");
const bycriptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')


const login = async (req, res) => {
    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'el correo no esta registrado'
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'el usuario no existe en la base de datos'
            })
        }

        //verifcar clave correcta
        const validPassword = bycriptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'contraseña incorrecta, porfa taipea bien papito'
            })
        }

        const token = await generarJWT(usuario.id);


        res.status(200).json({
            msg: 'bienvenido al infierno',
            usuario,
            token
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "comuniquese con el admin"
        })
    }
}

module.exports = {
    login,
}