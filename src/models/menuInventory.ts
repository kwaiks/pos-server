import { Model } from "objection";

export default class MenuInventory extends Model {
    id: number;
    menuId: number;
    inventoryId: number;
    inventoryTotal: number;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "menuInventory";
}