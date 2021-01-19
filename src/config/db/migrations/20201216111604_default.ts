/* eslint-disable max-len */
import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await Promise.all([
        knex.schema.createTable("admin", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("admin_email", 50).unique().index("admin_admin_email");
            t.string("admin_password", 100);
            t.string("admin_name");
            t.string("admin_role");
            t.boolean("admin_verified").defaultTo(false);
            t.timestamp("admin_verified_at");
            t.boolean("deleted").defaultTo(false);
            t.timestamp("updated_at");
            t.timestamp("created_at").defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("users", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("user_email", 100).notNullable().unique().index("user_user_email");
            t.string("user_password", 100);
            t.string("user_phone_number", 30).unique();
            t.string("user_first_name", 30).notNullable();
            t.string("user_last_name", 30);
            t.boolean("user_verified");
            t.timestamp("user_verified_at");
            t.boolean("deleted").defaultTo(false);
            t.timestamp("updated_at");
            t.timestamp("created_at").defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("customer", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("customer_email", 100).notNullable().unique().index("customer_user_email");
            t.string("customer_password", 100);
            t.string("customer_phone_number", 30).unique();
            t.string("customer_first_name", 30).notNullable();
            t.string("customer_last_name", 30);
            t.boolean("customer_verified").defaultTo(false);
            t.timestamp("customer_verified_at");
            t.boolean("deleted").defaultTo(false);
            t.timestamp("updated_at");
            t.timestamp("created_at").defaultTo(knex.fn.now());
        })
    ]);
    await Promise.all([
        knex.schema.withSchema("public").createTable("user_verification", t => {
            t.string("user_verification_code").primary().unique().unsigned();
            t.bigInteger("user_id").references("id").inTable("user").onDelete("CASCADE");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("active_until");
        }),
        knex.schema.withSchema("public").createTable("customer_verification", t => {
            t.string("customer_verification_code").primary().unique().unsigned();
            t.bigInteger("customer_id").references("id").inTable("customer").onDelete("CASCADE");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("active_until");
        }),
        knex.schema.withSchema("public").createTable("admin_verification", t => {
            t.string("admin_verification_code").primary().unique().unsigned();
            t.bigInteger("admin_id").references("id").inTable("admin").onDelete("CASCADE");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("active_until");
        })
    ]);
    // Master Tables
    await Promise.all([
        knex.schema.createTable("m_province", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("province_name", 50);
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
            t.bigInteger("created_by").references("id").inTable("admin");
            t.bigInteger("updated_by").references("id").inTable("admin");
        }),
        knex.schema.createTable("m_facility", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("facility_name", 50).notNullable();
            t.string("facility_icon", 50);
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
            t.bigInteger("created_by").references("id").inTable("admin");
            t.bigInteger("updated_by").references("id").inTable("admin");
        }),
        knex.schema.createTable("m_menu_category", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("menu_category_name", 50).unique();
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
            t.bigInteger("created_by").references("id").inTable("admin");
            t.bigInteger("updated_by").references("id").inTable("admin");
        }),
        knex.schema.createTable("m_store_category", t => {
            t.bigIncrements("id").primary().unsigned();
            t.string("store_category_name", 50).unique();
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
            t.bigInteger("created_by").references("id").inTable("admin");
            t.bigInteger("updated_by").references("id").inTable("admin");
        })
    ]);
    await knex.schema.withSchema("public").createTable("store", t => {
        t.bigIncrements("id").unsigned().primary();
        t.bigInteger("owner_id").unsigned().references("id").inTable("user");
        t.bigInteger("province_id").unsigned().references("id").inTable("m_province");
        t.string("store_name", 100).notNullable();
        t.string("store_picture");
        t.string("store_phone", 30);
        t.string("store_location");
        t.string("store_description");
        t.decimal("store_lat", 12, 8).notNullable();
        t.decimal("store_lng", 12, 8).notNullable();
        t.double("store_tax", 3).defaultTo(0);
        t.double("store_service_fee", 3).defaultTo(0);
        t.time("store_open_time");
        t.time("store_close_time");
        t.boolean("deleted").defaultTo(false);
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at");
    });
    await Promise.all(
        [
            knex.schema.withSchema("public").createTable("store_rating", t => {
                t.bigIncrements("id").unsigned().primary();
                t.bigInteger("store_id").unsigned().references("id").inTable("store");
                t.integer("store_rating_score", 2).defaultTo(0);
                t.string("store_rating_comment");
                t.bigInteger("created_by").unsigned().references("id").inTable("customer").onDelete("NO ACTION");
                t.timestamp("created_at").defaultTo(knex.fn.now());
                t.timestamp("updated_at");
            }),
            knex.schema.withSchema("public").createTable("store_user", t => {
                t.bigIncrements("id").unsigned().primary();
                t.bigInteger("store_id").unsigned().references("id").inTable("store");
                t.string("store_user_name", 50);
                t.string("store_user_pin");
                t.enum("store_user_role", ["owner", "admin", "cashier"]);
                t.boolean("deleted");
                t.timestamp("created_at").defaultTo(knex.fn.now());
                t.timestamp("updated_at");
            }),
        ]
    );
    await Promise.all([
        knex.schema.withSchema("public").createTable("store_facility", t => {
            t.bigIncrements("id").unsigned().primary();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.bigInteger("facility_id").unsigned().references("id").inTable("m_facility");
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
        knex.schema.withSchema("public").createTable("store_category", t => {
            t.bigIncrements("id").unsigned().primary();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.string("store_category_name", 50);
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
        knex.schema.withSchema("public").createTable("shift", t => {
            t.bigIncrements("id").unsigned().primary();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.bigInteger("store_user_id").unsigned().references("id").inTable("store_user");
            t.double("shift_initial_cash", 3, 20);
            t.double("shift_last_cash", 3, 20);
            t.string("shift_note");
            t.timestamp("shift_start_at").defaultTo(knex.fn.now());
            t.timestamp("shift_end_at");
        }),
        knex.schema.withSchema("public").createTable("shift_schedule", t => {
            t.bigIncrements("id").unsigned().primary();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.bigInteger("store_user_id").unsigned().references("id").inTable("store_user");
            t.integer("shift_schedule_day", 1).comment("1: Monday 7:Sunday");
            t.time("shift_schedule_start_time");
            t.time("shift_schedule_end_time");
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
        knex.schema.withSchema("public").createTable("menu", t => {
            t.bigIncrements("id").unsigned().primary();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.string("menu_name", 100);
            t.string("menu_photo");
            t.double("menu_price", 3);
            t.integer("menu_stock").defaultTo(0);
            t.string("menu_description");
            t.string("menu_code");
            t.double("menu_discount_percent", 3).defaultTo(0);
            t.double("menu_discount_price", 3).defaultTo(0);
            t.boolean("deleted");
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
        knex.schema.withSchema("public").createTable("inventory", t => {
            t.bigIncrements("id").unsigned().primary();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.string("inventory_name", 100);
            t.double("inventory_min_stock", 3).defaultTo(0);
            t.double("inventory_stock", 3).defaultTo(0);
            t.double("inventory_price", 3).defaultTo(0);
            t.string("inventory_unit");
            t.string("inventory_code");
            t.boolean("deleted");
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
    ]);

    await Promise.all([
        knex.schema.withSchema("public").createTable("menu_category", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("menu_id").unsigned().references("id").inTable("menu");
            t.string("menu_category_name", 50);
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
        knex.schema.withSchema("public").createTable("inventory_history", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("inventory_id").references("id").inTable("inventory");
            t.double("inv_hist_total_stock", 3).defaultTo(0);
            t.string("inv_hist_description");
            t.enum("inv_hist_type", ["purchase", "transaction"]);
            t.timestamp("created_at").defaultTo(knex.fn.now());
        }),
        knex.schema.withSchema("public").createTable("menu_inventory", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("menu_id").references("id").inTable("menu");
            t.bigInteger("inventory_id").references("id").inTable("inventory");
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.bigInteger("updated_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
            t.timestamp("updated_at");
        }),
    ]);

    await Promise.all([
        knex.schema.withSchema("public").createTable("purchase_order", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.string("po_code", 100);
            t.string("po_supplier_name", 100);
            t.double("po_amount", 3);
            t.string("po_notes", 100);
            t.bigInteger("created_by").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
        }),
        knex.schema.withSchema("public").createTable("transaction", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("store_id").unsigned().references("id").inTable("store");
            t.string("transaction_inv_no", 100).unique().index("trx_inv_no");
            t.string("transaction_tables");
            t.double("transaction_sub_total_price", 3);
            t.double("transaction_tax", 3);
            t.double("transaction_total_discount", 3);
            t.double("transaction_total_price", 3);
            t.double("transaction_charges", 3);
            t.double("transaction_changes", 3);
            t.string("transaction_notes", 100);
            t.boolean("transaction_paid").defaultTo(false);
            t.bigInteger("created_by").unsigned().references("id").inTable("customer");
            t.bigInteger("staff_id").unsigned().references("id").inTable("store_user");
            t.timestamp("created_at").defaultTo(knex.fn.now());
        })
    ]);
    await Promise.all([
        knex.schema.withSchema("public").createTable("transaction_detail", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("transaction_id").unsigned().references("id").inTable("transaction");
            t.bigInteger("menu_id").references("id").inTable("menu");
            t.integer("trx_item_qty").unsigned();
            t.string("trx_item_name");
            t.double("trx_item_price", 3);
            t.double("trx_item_discount_percent", 3);
            t.double("trx_item_discount_price", 3);
            t.string("trx_notes", 50);
            t.timestamp("created_at").defaultTo(knex.fn.now());
        }),
        knex.schema.withSchema("public").createTable("purchase_order_detail", t => {
            t.bigIncrements("id").primary().unsigned();
            t.bigInteger("purchase_order_id").unsigned().references("id").inTable("purchase_order");
            t.bigInteger("inventory_id").references("id").inTable("inventory");
            t.integer("po_item_qty").unsigned();
            t.string("po_item_price", 3);
            t.boolean("transaction_paid").defaultTo(false);
            t.timestamp("created_at").defaultTo(knex.fn.now());
        })
    ]);
    return await knex.schema.withSchema("public").createTable("cash_history", t => {
        t.bigIncrements("id").primary().unsigned();
        t.bigInteger("store_id").unsigned().references("id").inTable("store");
        t.bigInteger("shift_id").unsigned().references("id").inTable("shift");
        t.double("cash_amount", 3);
        t.string("cash_description", 100);
        t.enum("cash_type", ["transaction", "purchase", "advance", "settlement", "income", "outcome"]);
        t.bigInteger("transaction_id").unsigned().references("id").inTable("transaction");
        t.bigInteger("purchase_order_id").unsigned().references("id").inTable("purchase_order");
        t.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {

}

