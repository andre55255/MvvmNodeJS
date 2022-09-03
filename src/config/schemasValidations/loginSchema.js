const yup = require("yup");

const loginSchema = yup.object({
    body: yup.object({
        email: yup.string().email("Email inválido").required("Email não informado"),
        password: yup.string().required("Senha não informada")
    })
});

module.exports = { loginSchema }