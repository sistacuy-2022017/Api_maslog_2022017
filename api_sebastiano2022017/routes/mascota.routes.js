const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteRaza, existeMascotaById } = require('../helpers/db-validators-mascota');
const { mascotaPost, mascotaGet, mascotaPut } = require('../controllers/mascota.controller');


const router = Router();

router.get(
    "/",
    mascotaGet
);

router.post(
    "/",
    [
        check("NombreMascota", "el nombre es obligatorio").not().isEmpty(),
        check("RazaMascota", "esta raza ya existe").isString().isEmpty(),
        check("EdadMascota", "tiene que ser con numeros y caracteres").isString().isEmpty(),
        check("EspecieMascota").isString().isEmpty(),
        validarCampos,
    ], mascotaPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaPut);

module.exports = router;