const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUsuarioById } = require('../helpers/db-validators');

const { usuarioPost, usuariosGet, getUsuarioById, usuarioDelete, usuarioPut } = require('../controllers/user.controller');

const router = Router();

router.get(
    "/",
    usuariosGet
);

router.get(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB, pone atencion papito").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuarioPut);



router.delete(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB, pone atencion papito").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuarioDelete);


router.post(
    "/",
    [
        check("nombre", "el nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteress").isLength({ min: 6 }),
        check("correo", "este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], usuarioPost);


module.exports = router;