const Mascota = require('../models/mascota');

const existenteRaza = async (RazaMascota = '') => {
    const existeRaza = await Mascota.findOne({RazaMascota});

    if(existeRaza){
        throw new Error (`papito la raza ${RazaMascota} ya existe`);
    }

}

module.exports = {
    existenteRaza
}