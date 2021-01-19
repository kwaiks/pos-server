import { Model } from "objection";
import crypto from "crypto";

export default class AdminVerification extends Model {
    adminVerificationCode: string;
    adminId: number;
    createdAt: Date;
    activeUntil: Date;

    $beforeInsert() {
        this.adminVerificationCode = crypto.randomBytes(20).toString("hex");
        this.activeUntil = new Date(new Date().getTime() + (3 * 86400000));
    }

    static tableName = "adminVerification";
}