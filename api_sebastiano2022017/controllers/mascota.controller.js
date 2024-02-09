const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascota');

const mascotaPost = async (req, res) =>{
    const {NombreMascota, RazaMascota, EdadMascota, EspecieMascota, EstadoMascota } = req.body;
    const mascota = new Mascota({NombreMascota, RazaMascota, EdadMascota, EspecieMascota, EstadoMascota});

    await mascota.save();
    res.status(200).json({
        mascota
    })

}

const mascotaGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { EstadoMascota: true };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}



module.exports = {
    mascotaPost,
    mascotaGet
}