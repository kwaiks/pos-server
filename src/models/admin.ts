import { Model } from "objection";

export interface AdminItem {
    id?: number;
    adminEmail: string;
    adminPassword?: string;
    adminName?: string;
    adminRole: string;
}

export class Admin extends Model {
    id: number;
    adminEmail: string;
    adminPassword: string;
    adminName: string;
    adminRole: string;
    adminVerified: boolean;
    adminVerifiedAt: Date;
    deleted: boolean;
    updatedAt: Date;
    createdAt: Date;

    $beforeUpdate(){
        this.updatedAt = new Date();
    }

    static tableName = "admin";

    static jsonSchema = {
        type: "object",
        properties: {
            id: { type: "number" },
            adminEmail: { type: "string" },
            adminPassword: { type: "string" },
            adminName: { type: "string" },
            adminRole: { type: "string" },
            adminVerified: { type: "boolean" },
            deleted: { type: "boolean "}
        }
    }
}

export default {
    Admin
};