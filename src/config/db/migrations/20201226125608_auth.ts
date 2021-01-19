import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable("login_history", t => {
        t.bigIncrements("id").unsigned().primary();
        t.bigInteger("user_id").unsigned().notNullable();
        t.string("email", 100).notNullable();
        t.enum("type",["admin","user", "customer"]);
        t.string("ipAddress",20).notNullable();
        t.string("browser", 50).notNullable();
        t.string("operatingSystem", 50).notNullable();
        t.string("device", 50).notNullable();
        t.string("token").notNullable();
        t.string("refreshToken").notNullable();
        t.boolean("loggedIn").defaultTo(true);
        t.timestamp("lastAccess").defaultTo(knex.fn.now());
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable("login_history");
}

