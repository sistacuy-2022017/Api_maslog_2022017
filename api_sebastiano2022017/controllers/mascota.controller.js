const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascota');

const usuarioPost = async (req, res) =>{
    const {NombreMascota, RazaMascota, EdadMascota, EspecieMascota } = req.body;
    const mascota = new Mascota({NombreMascota, RazaMascota, EdadMascota, EspecieMascota});

    await mascota.save();
    res.status(200).json({
        mascota
    })

}


module.exports = {
    usuarioPost
}