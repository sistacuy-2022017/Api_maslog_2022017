const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarioById = async (req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

const usuarioPut = async (req, res = response) => {
    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;
    await Usuario.findByIdAndUpdate(id, resto);

    const  usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        msg: "usuario modificado",
        usuario
    });
}

const usuarioDelete = async  (req, res = response) => {
    const {id} = req.params;
    await Usuario.findByIdAndUpdate(id, {estado: false});

    const usuario = await Usuario.findOne({_id: id});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: 'usuario eliminado existoso',
        usuario,
        usuarioAutenticado
    });
}

const usuariosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}


const usuarioPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuarioPost,
    usuariosGet,
    getUsuarioById,
    usuarioDelete,
    usuarioPut
}