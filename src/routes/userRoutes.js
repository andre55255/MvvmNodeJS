const router = require("express").Router();
const userController = require("../controllers/userController");
const { validationRequest } = require("../middlewares/validationRequest");
const { createUserSchema } = require("../config/schemasValidations/userSchema");

router.post("/", validationRequest(createUserSchema), userController.createUser);

module.exports = router;