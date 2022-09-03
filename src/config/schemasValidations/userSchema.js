const yup = require("yup");

const createUserSchema = yup.object({
    body: yup.object({
        id: yup.number().required("Id deve ser informado com o valor -1"),
        email: yup.string().email("Email inválido").required("Email não informado"),
        password: yup.string()/*.matches(/^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "A senha deve conter no mínimo 8 caracteres, sendo 1 especial e 1 letra maiúscula")*/.required("Senha não informada"),
        first_name: yup.string().required("Primeiro nome não informado"),
        last_name: yup.string().notRequired(),
        roles: yup.array().required("Perfis do usuário não informados")
    })
});

module.exports = { createUserSchema }