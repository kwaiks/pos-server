import { Model } from "objection";

export default class PurchaseOrder extends Model {
    id: number;
    storeId: number;
    poCode: string;
    poSupplierName: string;
    poAmount: DoubleRange;
    poNotes: string;
    createdBy: number;
    createdAt: Date;

    static tableName = "purchaseOrder";
}