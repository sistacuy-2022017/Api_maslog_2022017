const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'no hay token papito'
        })
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await usuario.findOne(uid);

        if(!usuario){
            return res.status(400).json({
                msg: 'el usuario no existe papu'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token valido, usuario con estado false'
            })
        }

        req.usuario = usuario;

        next();

    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: 'token no valido papu:c'
        })
    }

}

module.exports = {
    validarJWT 
}