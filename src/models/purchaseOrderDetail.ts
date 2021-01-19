import { Model } from "objection";

export default class PurchaseOrderDetail extends Model {
    id: number;
    purchaseOrderId: number;
    inventoryId: number;
    poItemQty: number;
    poItemPrice: string;
    poItemNotes: number;
    createdAt: Date;

    static tableName = "transactionDetail";
}