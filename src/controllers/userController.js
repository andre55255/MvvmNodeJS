const userService = require("../services/userService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const createUser = async (req, res) => {
    try {
        logger.info("Acessado POST /user");
        const user = req.body;

        const result = await userService.create(user);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(201)
            .json(
                buildApiResponse(
                    true,
                    201,
                    "Usuário criado com sucesso",
                    result.object
                )
            );
    } catch (err) {
        logger.error("userController createUser - Exceção: " + err);
        return res
            .status(500)
            .json(
                buildApiResponse(
                    false,
                    500,
                    "Falha inesperada ao criar usuário"
                )
            );
    }
};

module.exports = {
    createUser,
};
