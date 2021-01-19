import { Model } from "objection";
import TransactionDetail from "./transactionDetail";

export default class Transaction extends Model {
    id: number;
    storeId: number;
    transactionInvNo: string;
    transactionTables: number;
    transactionSubTotalPrice: number;
    transactionTax: number;
    transactionTotalDiscount: number;
    transactionTotalPrice: number;
    transactionCharges: number;
    transactionChanges: number;
    transactionNotes: string;
    transactionPaid: boolean;
    createdBy: number;
    staffId: number;
    createdAt: Date;

    static tableName = "transaction";

    static relationMappings = {
        details: {
            relation: Model.HasManyRelation,
            modelClass: TransactionDetail,
            join: {
                from: "transaction.id",
                to: "transactionDetail.id"
            }
        }
    }
}