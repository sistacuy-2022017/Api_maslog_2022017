const {Schema, model} = require('mongoose');

const MascotaSchema = Schema ({

    NombreMascota: {
        type: String,
        required: [true, 'es obligatorio el nombre']
    },

    RazaMascota: {
        type: String,
        required: [true, 'es obligatorio la raza']
    },

    EdadMascota: {
        type: String,
        required: [true, 'es obligatoria la edad']
    },

    EspecieMascota: {
        type: String,
        required: [true, 'es obligatoria la especie']
    },

});

module.exports = model('Mascota', MascotaSchemass)