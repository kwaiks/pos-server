import { Model } from "objection";

export default class MasterProvince extends Model {
    id: number;
    provinceName: string;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;

    static tableName = "mProvince";

    $beforeUpdate(){
        this.updatedAt = new Date();
    }
}