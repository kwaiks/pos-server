import Province from "@/models/masterProvince";
import Facility from "@/models/masterFacility";
import StoreCategory from "@/models/masterStoreCategory";
import MenuCategory from "@/models/masterMenuCategory";

export default class ProvinceService {
    static async getAllProvince() {
        try{
            const result = await Province.query()
                                            .select([
                                                "id",
                                                "provinceName"
                                            ]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    
    static async addProvince(provinceName: string) {
        try {
            const result = await Province.query().insert({
                provinceName
            });
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getStoreCategories() {
        try {
            const result = await StoreCategory.query()
                                .select([
                                    "id",
                                    "storeCategoryName"
                                ]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async addStoreCategory(name: string) {
        try {
            const result = await StoreCategory.query().insert({
                storeCategoryName:name
            });
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getMenuCategories() {
        try {
            const result = MenuCategory.query()
                                        .select([
                                            "id",
                                            "menuCategoryName"
                                        ]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async addMenuCategory(name: string) {
        try {
            const result = await MenuCategory.query().insert({
                menuCategoryName: name
            });
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getFacilities() {
        try {
            const result = await Facility.query()
                                          .select([
                                              "id",
                                              "facilityName",
                                              "facilityIcon"
                                          ]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    
    static async addFacility(name: string) {
        try {
            const result = await Facility.query().insert({
                facilityName:name
            });
            return result;
        } catch (err) {
            throw err;
        }
    }
}