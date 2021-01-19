import { Model } from "objection";

export default class StoreRating extends Model {
    id: number;
    storeId: number;
    storeRatingScore: number;
    storeRatingComment: string;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "storeRating";

    static jsonSchema = {
        type: "object",
        properties: {
            storeId: { type: ["number","string"] },
            storeRatingScore: { type: "number" },
            storeRatingComment: { type: "string" }
        }
    }
}