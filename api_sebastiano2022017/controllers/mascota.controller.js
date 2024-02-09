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


const mascotaPut = async (req, res = response) => {
    const {id} = req.params;
    const { _id, EstadoMascota, RazaMascota, ...resto} = req.body;
    await Mascota.findByIdAndUpdate(id, resto);

    const  mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: "mascota modificada",
        mascota
    });
}


module.exports = {
    mascotaPost,
    mascotaGet,
    mascotaPut
}