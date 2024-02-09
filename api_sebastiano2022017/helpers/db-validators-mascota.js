const Mascota = require('../models/mascota');



const existeMascotaById = async (id = '') => {
    const existeMascota = await Mascota.findOne({ id });

    if (existeMascota) {
        throw new Error(`la mascota con el ${id} no existe`);
    }

}

module.exports = {
    existeMascotaById
}