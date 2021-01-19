import { Model } from "objection";
import MenuCategory from "./menuCategory";
import MenuInventory from "./menuInventory";

export default class Menu extends Model {
    id: number;
    storeId: number;
    menuName: string;
    menuPhoto: string;
    menuPrice: number;
    menuStock: number;
    menuDescription: string;
    menuCode: string;
    menuDiscountValue: number;
    menuDiscountType: "percent" | "fixed";
    isDiscount: boolean;
    menuCategoryId: number;
    deleted: boolean;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "menu";

    static pickJsonSchemaProperties = true;

    static jsonSchema = {
        type: "object",
        required: ["storeId", "menuName", "menuPrice"],
        properties: {
            id: {type: ["number", "string"] },
            storeId: {type: ["number", "string"]},
            menuName: { type: "string"},
            menuPhoto: { type: "string"},
            menuPrice: { type: "number"},
            menuStock: { type: "number" },
            menuDescription: { type: "string"},
            menuCode: { type: "string"},
            menuDiscountValue: {type: "number"},
            menuDiscountType: { type: "string"},
            menuCategoryId: { type: ["number", "string"]},
            isDiscount: {type: "boolean"}
        }
    }

    static relationMappings = {
        inventories: {
            relation: Model.HasManyRelation,
            modelClass: MenuInventory,
            join: {
                from: "menu.id",
                to: "menuInventory.menuId"
            }
        }
    }
}