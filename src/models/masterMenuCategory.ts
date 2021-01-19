import { Model } from "objection";

export default class MasterMenuCategory extends Model {
    id: number;
    menuCategoryName: string;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;

    static tableName = "mMenuCategory";

    $beforeUpdate(){
        this.updatedAt = new Date();
    }
}