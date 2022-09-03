const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const accountController = require("../controllers/accountController");
const { loginSchema } = require("../config/schemasValidations/loginSchema");

router.post("/login", validationRequest(loginSchema), accountController.login);

module.exports = router;