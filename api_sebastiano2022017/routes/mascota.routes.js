const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteRaza } = require('../helpers/db-validators-mascota');
const { mascotaPost } = require('../controllers/mascota.controller');


const router = Router();

router.post(
    "/",
    [
        check("NombreMascota", "el nombre es obligatorio").not().isEmpty(),
        check("RazaMascota", "esta raza ya existe").custom(existenteRaza),
        check("EdadMascota", "tiene que ser con numeros y caracteres").isString(),
        check("EspecieMascota").isString(),
        validarCampos,
    ], mascotaPost);


module.exports = router;