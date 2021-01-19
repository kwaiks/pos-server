import { Model } from "objection";

export default class StoreFacility extends Model {
    id: number;
    storeId: number;
    facilityId: number;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "storeFacility";

    static jsonSchema = {
        type: "object",
        required: ["storeId", "facilityId"],
        properties: {
            storeId: {type: ["number","string"]},
            facilityId: {type: ["number", "string"]}
        }
    }
}