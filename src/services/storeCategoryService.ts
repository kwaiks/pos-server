import StoreCategory from "@/models/storeCategory";
import AppError from "@/utils/error";

export default class StoreCategoryService {

    static async addCategory(
        storeId: number, storeCategoryId: number) {
        try {
            await StoreCategory.query().insert({
                storeId,
                storeCategoryId
            });
            return ;
        } catch (err) {
            throw new AppError("StoreCategoryError",err);
        } 
    }

    static async removeCategory(id: number) {
        try {
            await StoreCategory.query().del().where("id", id);
            return ;
        } catch (err) {
            throw new AppError("StoreCategoryError",err);
        } 
    }

    static async getStoreCategories(storeId: number){
        try {
            const result = await StoreCategory.query()
                                    .select([
                                        "id",
                                        "storeCategoryName"
                                    ])
                                    .where("storeId", storeId);
            return result;
        } catch (err) {
            throw new AppError("StoreCategoryError",err);
        }
    }
}