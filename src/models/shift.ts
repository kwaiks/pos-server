import { Model } from "objection";

export default class Shift extends Model {
    id: number;
    storeId: number;
    shiftInitialCash: number;
    shiftLastCash: number;
    shiftNote: string;
    shiftStartAt: Date;
    shiftEndAt: Date;

    $beforeUpdate() {
        this.shiftEndAt = new Date();
    }

    static tableName = "shift";
}