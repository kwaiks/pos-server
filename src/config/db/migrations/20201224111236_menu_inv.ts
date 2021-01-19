import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("menuInventory", t => {
        t.integer("inventory_total").defaultTo(0);
    });
}


export async function down(knex: Knex): Promise<void> {
}

