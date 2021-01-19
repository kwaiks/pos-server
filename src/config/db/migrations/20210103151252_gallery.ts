import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
   await knex.schema.withSchema("public")
                            .createTable("storeGallery", t => {
        t.bigIncrements("id").unsigned().primary();
        t.bigInteger("storeId").unsigned().references("id").inTable("store");
        t.string("mediaPath", 500).notNullable();
        t.enum("mediaType", ["image","video","image_360", "video_360"]);
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.bigInteger("createdBy").unsigned().references("id").inTable("users");
    });
    return;
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable("storeGallery");
}

