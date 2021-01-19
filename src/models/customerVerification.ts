import { Model } from "objection";
import crypto from "crypto";

export default class CustomerVerification extends Model {
    customerVerificationCode: string;
    customerId: number;
    createdAt: Date;
    activeUntil: Date;

    $beforeInsert() {
        this.customerVerificationCode = crypto.randomBytes(20).toString("hex");
        this.activeUntil = new Date(new Date().getTime() + (3 * 86400000));
    }

    static tableName = "customerVerification";
}