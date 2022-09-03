exports.up = async function (knex) {
    return await knex.schema
        .createTable("users", (table) => {
            table.increments("id").notNullable();
            table.string("first_name", 100).notNullable();
            table.string("last_name", 100).nullable();
            table.string("email", 256).unique().notNullable();
            table.string("password", 256).notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
            table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
            table.timestamp("disabled_at").nullable();
        })
        .createTable("roles", (table) => {
            table.increments("id").notNullable();
            table.string("name", 100).notNullable();
            table.string("normalized_name", 100).notNullable();
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
