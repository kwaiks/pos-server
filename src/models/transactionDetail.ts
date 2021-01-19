import { Model } from "objection";

export default class TransactionDetail extends Model {
    id: number;
    transactionId: number;
    menuId: number;
    trxItemQty: number;
    trxItemName: string;
    trxItemPrice: number;
    trxItemDiscountPrice: number;
    trxItemDiscountPercent: number;
    trxNotes: number;
    createdAt: Date;

    static tableName = "transactionDetail";
}