import { Model, Modifiers } from "objection";
import { Store } from "./store";

export interface UserItem {
    id: number;
    userEmail: string;
    userPassword: string;
    userFirstName: string;
    userLastName: string;
    userPhoneNumber: string;
    userPicture: string;
}

export class User extends Model {
    id: number;
    userEmail: string;
    userPassword: string;
    userFirstName: string;
    userLastName: string;
    userPhoneNumber: string;
    userPicture: string;
    userVerified: boolean;
    userVerifiedAt: Date;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    stores?: any;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    // table name
    static tableName = "users";

    // Optional JSON Schema
    static jsonSchema = {
        type: "object",
        required: ["userEmail", "userFirstName", "userPhoneNumber"],
        properties: {
            id: { type: "number" },
            userEmail: { type: "string" },
            userPassword: { type: "string" },
            userFirstName: { type: "string", maxLength: 50 },
            userLastName: { type: "string", maxLength: 50 },
            userPhoneNumber: { type: "string", maxLength: 25},
            userPicture: { type: "string" },
            userVerified: { type: "boolean" },
            deleted: { type: "boolean" }
        }
    }

    static relationMappings = {
        stores: {
            relation: Model.HasManyRelation,
            modelClass: Store,
            join: {
                from: "users.id",
                to: "store.ownerId"
            }
        }
    }

    // Modifiers
    static modifiers: Modifiers = {
        // search user by email
        searchByEmail(query, email) {
            query.where("email", email);
        }
    }
}

export default {
    User
};