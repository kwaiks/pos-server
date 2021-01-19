import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("menu", t => {
        t.renameColumn("menuDiscountPrice", "menuDiscountValue");
        t.dropColumn("menuDiscountPercent");
        t.enum("menuDiscountType", ["percent","fixed"]).defaultTo("fixed");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("menu", t => {
        t.double("menu_discount_percent", 3).defaultTo(0);
        t.renameColumn("menuDiscountValue", "menuDiscountPrice");
        t.dropColumn("menuDiscountType");
    });
}

