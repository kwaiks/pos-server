import { Model } from "objection";

export default class Inventory extends Model {
    id: number;
    storeId: number;
    inventoryName: string;
    inventoryMinStock: number;
    inventoryStock: number;
    inventoryPrice: number;
    inventoryUnit: string;
    inventoryCode: string;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "inventory";

    static jsonSchema = {
        type: "object",
        required: ["storeId", "inventoryName", "inventoryPrice"],
        properties: {
            id: { type: ["number","string"] },
            inventoryName: { type: "string" },
            inventoryStock: { type: "number" },
            inventoryMinStock: { type: "number" },
            inventoryPrice: { type: "number" },
            storeId: { type: ["number","string"] },
            inventoryUnit: { type: "string" },
            inventoryCode: { type: "string" }
        }
    }
}