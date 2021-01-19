import { Model } from "objection";

export default class ShiftSchedule extends Model {
    id: number;
    storeId: number;
    storeUserId: number;
    shiftScheduleDay: number;
    shiftScheduleStartTime: string;
    shiftScheduleEndTime: string;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "shiftSchedule";
}