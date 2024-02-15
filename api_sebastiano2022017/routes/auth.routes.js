const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
    '/login',
    [
        check('correo', 'este no es un correo valido').isEmail(),
        check('password', 'la contrasena es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

module.exports = router;