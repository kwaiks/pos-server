import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", t => {
        t.string("user_picture");
    });
    return await knex.schema.alterTable("customer", t => {
        t.string("customer_picture");
    }); 
}


export async function down(knex: Knex): Promise<void> {
}

