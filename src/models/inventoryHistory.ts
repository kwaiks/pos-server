import { Model } from "objection";

export default class InventoryHistory extends Model {
    id: number;
    inventoryId: number;
    invHistTotalStock: number;
    invHistDescription: string;
    invHistType: "purchase" | "transaction";
    createdAt: Date;

    static tableName = "inventoryHistory";

    static jsonSchema = {
        type: "object",
        required: ["inventoryId", "invHistTotalStock", "invHistType"],
        properties: {
            id: { type: "number" },
            inventoryId: { type: "number" },
            invHistTotalStock: { type: "number" },
            invHistDescription: { type: "number" },
            invHistType: { type: "string" }
        }
    }
}