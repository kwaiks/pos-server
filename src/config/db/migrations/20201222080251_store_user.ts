import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("store_user", t => {
        t.boolean("deleted").alter().defaultTo(false);
    });
    await knex.schema.alterTable("menu", t => {
        t.boolean("deleted").alter().defaultTo(false);
    });
    await knex.schema.alterTable("inventory", t => {
        t.boolean("deleted").alter().defaultTo(false);
    });
    return;
}


export async function down(knex: Knex): Promise<void> {
}

