import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("purchase_order_detail", t => {
        t.dropColumn("transaction_paid");
        t.string("po_item_notes");
    });
}


export async function down(knex: Knex): Promise<void> {
}

