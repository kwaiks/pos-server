import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("login_history", t => {
        t.string("refreshToken", 500).alter();
        t.string("token", 500).alter();
    });
}


export async function down(knex: Knex): Promise<void> {
}

