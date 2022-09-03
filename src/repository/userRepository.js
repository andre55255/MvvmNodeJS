const { db } = require("../config/database/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const getById = async (id) => {
    try {
        const userSave = await db
            .select()
            .table("users")
            .innerJoin("users_roles", "users_roles.id", "users.id")
            .innerJoin("roles", "users_roles.id_role", "roles.id")
            .where({ id, disabled_at: null });

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
            roles: [],
        };

        userSave.forEach((user, index) => {
            userReturn.roles.push({
                id: user.id_role,
                name: user.name,
                normalized_name: user.normalized_name,
            });
        });

        return userReturn;
    } catch (err) {
        logger.error("userRepository getById - Exceção: " + err);
        return null;
    }
};

const getByEmail = async (email) => {
    try {
        const userSave = await db
            .select()
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
            roles: [],
        };

        userSave.forEach((user, index) => {
            userReturn.roles.push({
                id: user.id_role,
                name: user.name,
                normalized_name: user.normalized_name,
            });
        });

        return userReturn;
    } catch (err) {
        logger.error("userRepository getByEmail - Exceção: " + err);
        return null;
    }
};

const create = async (user) => {
    try {
        await db
            .insert({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
            })
            .into("users");

        const userId = await db.select("id")
                                .table("users")
                                .where({ email: user.email });

        user.roles.forEach(async (role, index) => {
            await db
                .insert({
                    id_user: userId[0].id,
                    id_role: role,
                })
                .into("users_roles");
        });

        const userSave = await getById(userId[0].id);
        return buildResult(true, "Usuário inserido com sucesso", userSave);
    } catch (err) {
        logger.error("userRepository create - Exceção: " + err);
        return buildResult(false, "Erro ao inserir usuário no banco de dados");
    }
};

module.exports = {
    getById,
    getByEmail,
    create,
};
