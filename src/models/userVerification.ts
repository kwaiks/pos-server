import { Model } from "objection";
import crypto from "crypto";

export default class UserVerification extends Model {
    userVerificationCode: string;
    userId: number;
    createdAt: Date;
    activeUntil: Date;

    $beforeInsert() {
        this.userVerificationCode = crypto.randomBytes(20).toString("hex");
        this.activeUntil = new Date(new Date().getTime() + (3 * 86400000));
    }

    static tableName = "userVerification";
}