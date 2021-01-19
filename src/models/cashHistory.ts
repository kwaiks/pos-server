import { Model } from "objection";

export default class CashHistory extends Model {
    id: number;
    storeId: number;
    shiftId: number;
    cashAmount: number;
    cashDescription: string;
    cashType: "transaction" 
                | "purchase" 
                | "advance" 
                | "settlement" 
                | "income" 
                | "outcome";
    transactionId: number;
    purchaseOrderId: number;
    createdAt: Date;

    static tableName = "cashHistory"
}