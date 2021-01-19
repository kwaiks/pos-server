import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("menuRatingType", t => {
        t.bigIncrements("id").unsigned().primary();
        t.string("ratingType");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
    await knex.schema.withSchema("public")
                            .createTable("menuRating", t => {
        t.bigIncrements("id").unsigned().primary();
        t.bigInteger("menuId").unsigned().references("id").inTable("menu");
        t.bigInteger("ratingTypeId").unsigned().references("id")
                                                .inTable("menuRatingType");
        t.integer("ratingScore");
        t.string("ratingComment");
        t.bigInteger("createdBy").unsigned().references("id")
                                    .inTable("customer");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("menuRating");
    await knex.schema.dropTable("menuRatingType");
}

