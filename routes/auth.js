const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { fieldValidator } = require("../middlewares/fieldValidator");

const { jwtValidate } = require("../middlewares/jwtValidator");

router.post(
  "/new",
  [check("name", "El campo nombre es obligatorio").notEmpty()],
  [check("email", "Debe ingresar un email valido").isEmail()],
  [check("password", "Campo contraseña es obligatorio").notEmpty()],
  [
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  fieldValidator,
  createUser
);

router.post(
  "/",
  [check("email", "Debe ingresar un email valido").isEmail()],
  [check("password", "Campo contraseña es obligatorio").notEmpty()],
  [
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  fieldValidator,
  loginUser
);

router.get("/renew", jwtValidate, fieldValidator, renewToken);

module.exports = router;
