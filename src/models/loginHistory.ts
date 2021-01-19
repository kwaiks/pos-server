import { Model } from "objection";

export default class LoginHistory extends Model {
    id: number;
    userId: number;
    email: string;
    type: "admin" | "user" | "customer";
    ipAddress: string;
    browser: string;
    operatingSystem: string;
    device: string;
    token: string;
    refreshToken: string;
    loggedIn: boolean;
    lastAccess: Date;
    createdAt: Date;

    $beforeUpdate(){
        this.lastAccess = new Date();
    }

    static tableName = "loginHistory";
}