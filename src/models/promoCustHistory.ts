import { Model } from "objection";

export default class PromoCustHistory extends Model {
    id: number;
    custId: number;
    promoId: number;
    transactionId: number;

    static tableName = "promoCustHistory";
}