import { Model } from "objection";

export default class MasterStoreCategory extends Model {
    id: number;
    storeCategoryName: string;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;

    static tableName = "mStoreCategory";

    $beforeUpdate(){
        this.updatedAt = new Date();
    }
}