const Mascota = require('../models/mascota');

const existenteRaza = async (RazaMascota = '') => {
    const existeRaza = await Mascota.findOne({ RazaMascota });

    if (existeRaza) {
        throw new Error(`papito la raza ${RazaMascota} ya existe`);
    }

}

const existeMascotaById = async (id = '') => {
    const existeMascota = await Mascota.findOne({ id });

    if (existeMascota) {
        throw new Error(`la mascota con el ${id} no existe`);
    }

}

module.exports = {
    existenteRaza,
    existeMascotaById
}