const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");
const { hash } = require("bcrypt");
const userRepo = require("../repository/userRepository");

const create = async (user) => {
    try {
        const passwordHash = await hash(user.password, 10);
        if (!passwordHash) {
            logger.error("userService create - Falha ao encriptar a senha para inserir");
            return buildResult(false, "Falha ao tratar a senha para inserir");
        }
        user.password = passwordHash;
        const resultInserted = await userRepo.create(user);
        if (!resultInserted || !resultInserted.success) {
            logger.error("userService create - " + resultInserted.message);
            return buildResult(false, resultInserted.message);
        }
        return buildResult(true, "Usuário inserido com sucesso", resultInserted.object);
    } catch (err) {
        logger.error("userService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar usuário");
    }
};

module.exports = {
    create,
};
