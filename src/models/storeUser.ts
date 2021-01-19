import { Model } from "objection";

export class StoreUser extends Model {
    id: number;
    storeId: number;
    storeUserName: string;
    storeUserPin: string;
    storeUserRole: "owner" | "admin" | "cashier";
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;

    $beforeInsert() {
        this.createdAt = new Date();
    }

    static tableName = "storeUser";

    static jsonSchema = {
        type: "object",
        required: ["storeUserName", "storeId", "storeUserRole"],
        properties: {
            storeUserName: { type: "string" },
            storeId: { type: ["number","string"] },
            storeUserRole: { type: "string" }
        }
    }
}