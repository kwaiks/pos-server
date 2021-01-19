import { Model } from "objection";

export default class StoreMenuCategory extends Model {
    id: number;
    storeId: number;
    menuCategoryName: string;
    deleted: boolean;

    static tableName = "storeMenuCategory";
}