const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaById } = require('../helpers/db-validators-mascota');
const { mascotaPost, mascotaGet, mascotaPut, getMascotaById, mascotaDelete } = require('../controllers/mascota.controller');


const router = Router();

router.get(
    "/",
    mascotaGet
);

router.post(
    "/",
    [
        check("NombreMascota", "el nombre es obligatorio").not().isEmpty(),
        check("RazaMascota", "campo obligatorio").not().isEmpty(),
        check("EdadMascota", "tiene que ser con numeros y caracteres").not().isEmpty(),
        check("EspecieMascota").not().isEmpty(),
        validarCampos,
    ], mascotaPost);

router.get(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB, pone atencion papito").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], getMascotaById);


router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaDelete);

module.exports = router;