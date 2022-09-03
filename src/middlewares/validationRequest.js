require("yup");
const { buildApiResponse } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const validationRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();
    } catch (err) {
        logger.error("Erro validação dos dados da requisição: " + err.message);
        return res.status(400).json(buildApiResponse(false, 400, err.message));
    }
};

module.exports = { validationRequest };
