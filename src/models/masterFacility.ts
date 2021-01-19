import { Model } from "objection";

export default class MasterFacility extends Model {
    id: number;
    facilityName: string;
    facilityIcon: string;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;

    static tableName = "mFacility";

    $beforeUpdate(){
        this.updatedAt = new Date();
    }
}