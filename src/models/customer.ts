import { Model } from "objection";

export interface CustomerItem {
    id: number;
    customerEmail: string;
    customerPassword: string;
    customerFirstName: string;
    customerLastName: string;
    customerPhoneNumber: string;
    customerPicture: string;
}

export class Customer extends Model {
    id: number;
    customerEmail: string;
    customerPassword: string;
    customerFirstName: string;
    customerLastName: string;
    customerPhoneNumber: string;
    customerPicture: string;
    customerVerified: boolean;
    customerVerifiedAt: Date;
    deleted: boolean;
    updated_at: Date;
    created_at: Date;

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static tableName = "customer";

    static jsonSchema = {
        type: "object",
        properties: {
            id: {type:"number"},
            customerEmail: {type:"string"},
            customerPassword: {type:"string"},
            customerFirstName: {type:"string"},
            customerLastName: {type:"string"},
            customerPhoneNumber: {type:"string"},
            customerPicture: {type:"string"},
            customerVerified: {type:"boolean"},
            deleted: {type:"boolean"}
        }
    }
}

export default {
    Customer
};