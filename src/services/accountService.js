const { authConfigJwt } = require("../config/authJwt/authJwt");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");
const { compare } = require("bcrypt");
const userRepo = require("../repository/userRepository");
const { sign } = require("jsonwebtoken");

const login = async ({ email, password }) => {
    try {
        const userSave = await userRepo.getByEmail(email);
        if (!userSave) {
            logger.warn("accountService login - Usuário não encontrado, usuario: " + email);
            buildResult(false, "Usuário não encontrado");
        }
        const isPasswordCorrect = await compare(password, userSave.password);
        if (!isPasswordCorrect) {
            logger.warn("accountService login - Senha incorreta, usuario: " + email);
            buildResult(false, "Senha incorreta");
        }
        const payloadJwt = {
            id_user: userSave.id,
            email_user: userSave.email,
            roles_user: userSave.roles
        };
        const claims = {
            expiresIn: authConfigJwt.expires,
            audience: authConfigJwt.audience,
            issuer: authConfigJwt.issuer 
        }
        const jwtToken = sign(payloadJwt, process.env.JWT_KEY, claims);
        return buildResult(true, "Login efetuado com sucesso", {
            user: userSave.first_name + " " + userSave.last_name,
            accessToken: jwtToken
        });
    } catch (err) {
        logger.error("accountService login - Exceção: " + err);
        return buildResult(false, "Falha ao realizar login");
    }
};

module.exports = {
    login,
};