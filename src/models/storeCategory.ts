import { Model } from "objection";

export default class StoreCategory extends Model {
    id: number;
    storeId: number;
    storeCategoryId: number;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "storeCategory";

    static jsonSchema = {
        type: "object",
        required: ["storeId", "storeCategoryId"],
        properties: {
            storeId: { type: ["number","string"] },
            storeCategoryId: { type: ["string","number"] }
        }
    }
}