const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");

const { loginSchema } = require("../config/schemasValidations/loginSchema");

router.post("/login", validationRequest(loginSchema));

module.exports = router;