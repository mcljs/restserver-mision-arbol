const haveRole = require('../middlewares/validar-roles')
const validarCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");

module.exports = {
    ...validarCampos,
    ...haveRole,
    ...validarJWT,
}