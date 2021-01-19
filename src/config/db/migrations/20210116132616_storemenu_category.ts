import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema("public")
                    .createTable("storeMenuCategory",t => {
        t.bigIncrements("id").primary().unsigned();
        t.bigInteger("storeId").references("id").inTable("store");
        t.string("menuCategoryName",50).unique();
        t.boolean("deleted").defaultTo("false");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
    await knex.schema.withSchema("public").alterTable("menu", t => {
        t.bigInteger("menuCategoryId").references("id")
                .inTable("storeMenuCategory");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.withSchema("public").alterTable("menu", t => {
        t.dropColumn("menuCategoryId");
    });
    await knex.schema.dropTable("storeMenuCategory");
}

