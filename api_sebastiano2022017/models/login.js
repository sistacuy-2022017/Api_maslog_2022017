const {Schema, model} = require('mongoose');

const LoginSchema = Schema ({
    correo: {
        type: String,
        required: [true, 'el correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },

});

module.exports = model('Login', LoginSchema);