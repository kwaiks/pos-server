import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema("public").alterTable("storeCategory", t => {
        t.dropColumn("storeCategoryName");
        t.bigInteger("storeCategoryId")
            .unsigned().references("id").inTable("mStoreCategory");
    });
    await knex.schema.withSchema("public").alterTable("menuCategory", t => {
        t.dropColumn("menuCategoryName");
        t.bigInteger("menuCategoryId")
            .unsigned().references("id").inTable("mMenuCategory");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("storeCategory", t => {
        t.dropColumn("storeCategoryId");
        t.string("storeCategoryName",50).defaultTo("");
    });
    await knex.schema.alterTable("menuCategory", t => {
        t.dropColumn("menuCategoryId");
        t.string("menuCategoryName",50).defaultTo("");
    });
}

