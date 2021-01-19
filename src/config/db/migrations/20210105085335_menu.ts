import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("menu", t => {
        t.boolean("isDiscount").defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("menu", t => {
        t.dropColumn("isDiscount");
    });
}

