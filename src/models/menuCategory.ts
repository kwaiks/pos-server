import { Model } from "objection";

export default class MenuCategory extends Model {
    id: number;
    menuId: number;
    menuCategoryId: number;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "menuCategory";
}