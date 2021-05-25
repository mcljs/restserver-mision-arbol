const { Router } = require("express");
const {check} = require("express-validator");
const {validarCampos,haveRole,validarJWT} = require('../middlewares')
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");

const {isRoleValid, isEmailExist,isUserbyIdExist} = require("../helpers/db-validators");


const router = Router();

router.get("/", usersGet);

router.post("/",[
  check('name','El correo es obligatorio').not().isEmpty(),
  check('password','El password debe ser más de 6 letras').isLength({min:6}),
  check('email','El correo no es valido').isEmail(),
  check('email').custom(isEmailExist),
  //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(isRoleValid),
  validarCampos

], usersPost);

router.put("/:id",[
  check('id','No es un ID válido').isMongoId(),
  check('id').custom(isUserbyIdExist),
  check('rol').custom(isRoleValid),
  validarCampos,
], usersPut);

router.patch("/", usersPatch);

router.delete("/:id",[
    validarJWT,
  //isAdminRole,
    haveRole('ADMIN_ROLE','RRHH_ROLE'),
  check('id','No es un ID válido').isMongoId(),
  check('id').custom(isUserbyIdExist),
  validarCampos
], usersDelete);

module.exports = router;
