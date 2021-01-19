import { Model } from "objection";
import { StoreUser } from "./storeUser";
import StoreCategory from "./storeCategory";
import StoreFacility from "./storeFacility";
import StoreRating from "./storeRating";
import MasterProvince from "./masterProvince";
import Menu from "./menu";

export interface StoreItem {
    id?: number;
    ownerId: number;
    provinceId: number;
    storeName: string;
    storeLocation: string;
    storePicture: string;
    storeDescription: string;
    storePhone: string;
    storeLat: number;
    storeLng: number;
    storeTax: number;
    storeServiceFee: number;
    storeOpenTime?: string;
    storeCloseTime?: string;
}

export class Store extends Model {
    id?: number;
    ownerId: number;
    provinceId: number;
    storeName: string;
    storeLocation: string;
    storePicture: string;
    storeDescription: string;
    storePhone: string;
    storeLat: number;
    storeLng: number;
    storeTax: number;
    storeServiceFee: number;
    storeOpenTime: string;
    storeCloseTime: string;
    deleted: boolean;
    storeUser?: object;
    createdAt: Date;
    updatedAt: Date;

    static tableName = "store";

    static pickJsonSchemaProperties = true;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static jsonSchema = {
        type: "object",
        required: ["storeName", "storeLat", "storeLng"],
        properties: {
            id: { type: ["number","string"] },
            ownerId: { type: ["number","string"] },
            provinceId: { type: ["number","string"] },
            storeName: { type: "string", minLength: 1},
            storeLocation: { type: "string" },
            storePicture: { type: "string" },
            storeLat: { type: "number", minLength: 1 },
            storeLng: { type: "number", minLength: 1},
            storeOpenTime: { type: "string", minLength: 1},
            storeCloseTime: { type: "string", minLength: 1 },
            storeTax: { type: "number" },
            storeServiceFee: { type: "number" },
            storeDescription: { type: "string" },
        }
    }

    static relationMappings = {
        province: {
            relation: Model.BelongsToOneRelation,
            modelClass: MasterProvince,
            join: {
                from: "store.provinceId",
                to: "mProvince.id"
            }
        },
        storeUser: {
            relation: Model.HasManyRelation,
            modelClass: StoreUser,
            join: {
                from: "store.id",
                to: "storeUser.storeId"
            }
        },
        category: {
            relation: Model.HasManyRelation,
            modelClass: StoreCategory,
            join: {
                from: "store.id",
                to: "storeCategory.storeId"
            }
        },
        facility: {
            relation: Model.HasManyRelation,
            modelClass: StoreFacility,
            join: {
                from: "store.id",
                to: "storeFacility.storeId"
            }
        },
        ratings: {
            relation: Model.HasManyRelation,
            modelClass: StoreRating,
            join: {
                from: "store.id",
                to: "storeRating.storeId"
            }
        },
        menu: {
            relation: Model.HasManyRelation,
            modelClass: Menu,
            join: {
                from: "store.id",
                to: "menu.storeId"
            }
        }
    }
}

