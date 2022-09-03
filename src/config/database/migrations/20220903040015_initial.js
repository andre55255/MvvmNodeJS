exports.up = async function (knex) {
    return await knex.schema
        .createTable("users", (table) => {
            table.increments("id").notNullable();
            table.string("firstName", 100).notNullable();
            table.string("lastName", 100).nullable();
            table.string("email", 256).unique().notNullable();
            table.string("password", 256).notNullable();
            table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable();
            table.timestamp("disabledAt").nullable();
        })
        .createTable("roles", (table) => {
            table.increments("id").notNullable();
            table.string("name", 100).notNullable();
            table.string("normalizedName", 100).notNullable();
        })
        .createTable("users_roles", (table) => {
            table.integer("id_user").unsigned().notNullable();
            table.foreign("id_user").references("users.id");

            table.integer("id_role").unsigned().notNullable();
            table.foreign("id_role").references("roles.id");
        });
};

exports.down = async function (knex) {
    return await knex.schema
        .dropTableIfExists("users_roles")
        .dropTableIfExists("roles")
        .dropTableIfExists("users");
};
