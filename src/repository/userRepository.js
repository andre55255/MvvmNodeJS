const { db } = require("../config/database/database");
const { logger } = require("../middlewares/logger");

const getByEmail = async (email) => {
    try {
        const userSave = await db.select()
                            .table("users")
                            .innerJoin("users_roles", "users_roles.id", "users.id")
                            .innerJoin("roles", "users_roles.id_role", "roles.id")
                            .where({ email, disabled_at: null });

        if (!userSave || userSave.length <= 0) {
            return null;
        }

        const userReturn = {
            id: userSave[0].id,
            first_name: userSave[0].first_name,
            last_name: userSave[0].last_name,
            email: userSave[0].email,
            password: userSave[0].password,
            created_at: userSave[0].created_at,
            roles: []
        }

        userSave.forEach((user, index) => {
            userReturn.roles.push({
                id: user.id_role,
                name: user.name,
                normalized_name: user.normalized_name
            });
        });

        return userReturn;
    } catch (err) {
        logger.error("userRepository getByEmail - Exceção: " + err);
        return null;
    }
};

module.exports = {
    getByEmail,
};
