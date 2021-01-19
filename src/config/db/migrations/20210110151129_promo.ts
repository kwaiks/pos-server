import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema("public").createTable("promo", t => {
        t.bigIncrements("id").unsigned().primary();
        t.bigInteger("storeId").unsigned().references("id").inTable("store");
        t.string("promoCode").notNullable();
        t.string("promoPicture");
        t.double("promoMinPrice").defaultTo(0.00);
        t.timestamp("promoValidFrom").notNullable();
        t.timestamp("promoValidUntil").notNullable();
        t.integer("promoTotal").defaultTo(1);
        t.boolean("deleted").defaultTo(false);
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.timestamp("updatedAt");
        t.unique(["storeId", "promoCode"]);
    });
    await knex.schema.withSchema("public")
                        .createTable("promo_cust_history", t => {
        t.bigIncrements("id").unsigned().primary();
        t.bigInteger("custId").unsigned().references("id").inTable("customer");
        t.bigInteger("promoId").unsigned().references("id").inTable("promo");
        // eslint-disable-next-line max-len
        t.bigInteger("transactionId").unsigned().references("id").inTable("transaction");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("promo_cust_history");
    await knex.schema.dropTable("promo");
}

