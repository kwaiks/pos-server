import * as Knex from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    const adminPassword = await bcrypt.hash("adminpassword", 1);
    const vendorPassword = await bcrypt.hash("vendorpassword", 1);
    const custPassword = await bcrypt.hash("userpassword", 1);
    const dateNow = new Date();

    await knex("cash_history").del();
    await Promise.all([
        knex("transaction_detail").del(),
        knex("purchase_order_detail").del()
    ]);
    await Promise.all([
        knex("purchase_order").del(),
        knex("transaction").del()
    ]);
    await Promise.all([
        knex("menu_category").del(),
        knex("inventory_history").del(),
        knex("menu_inventory").del()
    ]);
    await Promise.all([
        knex("inventory").del(),
        knex("menu").del(),
        knex("shift_schedule").del(),
        knex("shift").del(),
        knex("store_category").del(),
        knex("store_facility").del()
    ]);
    await Promise.all([
        knex("store_rating").del(),
        knex("store_user").del()
    ]);
    await knex("store").del();

    await Promise.all([
        knex("m_province").del(),
        knex("m_facility").del(),
        knex("m_menu_category").del(),
        knex("m_store_category").del()
    ]);

    await Promise.all([
        knex("admin").del(),
        knex("user").del(),
        knex("customer").del()
    ]);

    const userAdmin = await knex("admin").insert({
        adminEmail: "admin@mesan.com",
        adminPassword,
        adminName: "Admin",
        adminRole: "super",
        adminVerified: true,
        adminVerifiedAt: dateNow,
    },"id");
    const userStore = await knex("user").insert({
        userEmail: "store@mesan.com",
        userPassword: vendorPassword,
        userPhoneNumber: "6285715565340",
        userFirstName: "Owner",
        userVerified: true,
        userVerifiedAt: dateNow
    },["id","userFirstName"]);
    const userCust = await knex("customer").insert({
        customerEmail: "cust@mesan.com",
        customerPassword: custPassword,
        customerPhoneNumber: "6285715565340",
        customerFirstName: "Alex",
        customerVerified: true,
        customerVerifiedAt: dateNow
    }, "id");

    const province = await knex("m_province").insert(
        { provinceName: "Banten" }
    ).returning("id");
    
    await Promise.all([
        knex("m_province").insert([
            { provinceName: "Aceh" },
            { provinceName: "Sumatera Utara" },
            { provinceName: "Sumatera Barat" },
            { provinceName: "Riau" },
            { provinceName: "Jambi" },
            { provinceName: "Sumatera Selatan" },
            { provinceName: "Bengkulu" },
            { provinceName: "Lampung" },
            { provinceName: "Kepulauan Bangka Belitung" },
            { provinceName: "Kepulauan Riau" },
            { provinceName: "DKI Jakarta" },
            { provinceName: "Jawa Barat" },
            { provinceName: "Jawa Tengah" },
            { provinceName: "DI Yogyakarta" },
            { provinceName: "Jawa Timur" },
            { provinceName: "Bali" },
            { provinceName: "Nusa Tenggara Barat" },
            { provinceName: "Nusa Tenggara Timur" },
            { provinceName: "Kalimantan Barat" },
            { provinceName: "Kalimantan Timur" },
            { provinceName: "Kalimantan Selatan" },
            { provinceName: "Kalimantan Utara" },
            { provinceName: "Kalimantan Tengah" },
            { provinceName: "Sulawesi Utara" },
            { provinceName: "Sulawesi Tengah" },
            { provinceName: "Sulawesi Selatan" },
            { provinceName: "Sulawesi Tenggara" },
            { provinceName: "Gorontalo" },
            { provinceName: "Sulawesi Barat" },
            { provinceName: "Maluku" },
            { provinceName: "Maluku Utara" },
            { provinceName: "Papua Barat" },
            { provinceName: "Papua" },
        ]),
        knex("m_facility").insert([
            { facilityName: "WiFi" },
            { facilityName: "CoWorking Space" },
            { facilityName: "Smoking Area" },
            { facilityName: "Free Drink Refill" }
        ]),
        knex("m_store_category").insert([
            { storeCategoryName : "Kafe" },
            { storeCategoryName : "Angkringan" },
            { storeCategoryName : "Fast Food" }
        ]),
        knex("m_menu_category").insert([
            { menuCategoryName: "Nasi" },
            { menuCategoryName: "Manual Brew Coffee" },
            { menuCategoryName: "Milk" }
        ])
    ]);
};
