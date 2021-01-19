import StoreFacility from "@/models/storeFacility";
import AppError from "@/utils/error";

export default class StoreFacilityService {

    static async addFacility(storeId: number, facilityId: number) {
        try {
            await StoreFacility.query().insert({
                storeId,
                facilityId
            });
            return ;
        } catch (err) {
            throw new AppError("StoreFacilityError",err);
        } 
    }

    static async removeFacility(id: number) {
        try {
            await StoreFacility.query().del().where("id", id);
            return ;
        } catch (err) {
            throw new AppError("StoreFacilityError",err);
        } 
    }

    static async getStoreFacilities(storeId: number){
        try {
            const result = await StoreFacility.query()
                                    .select([
                                        "storeFacility.id", 
                                        "facilityName", 
                                        "facilityIcon"])
                                    .join(
                                        "m_facility",
                                        "m_facility.id",
                                        "=",
                                        "store_facility.id")
                                    .where("storeId", storeId);
            return result;
        } catch (err) {
            throw new AppError("StoreFacilityError",err);
        }
    }
}