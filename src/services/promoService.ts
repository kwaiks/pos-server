import Promo from "@/models/promo";

export default class PromoService {
    async getStorePromo(storeId: number) {
        try {
            const result = 
                await Promo.query().select(
                    "id",
                    "promoCode",
                    "promoMinPrice",
                    "promoPicture",
                    "promoTotal",
                    "promoValidFrom",
                    "promoValidUntil")
                .where("storeId", storeId)
                .where("deleted", false);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async addPromo({
        storeId, 
        promoCode,
        promoMinPrice,
        promoPicture,
        promoTotal,
        promoValidFrom,
        promoValidUntil
    }:{
        storeId: number,
        promoCode: string,
        promoMinPrice: number,
        promoPicture: string,
        promoTotal: number,
        promoValidFrom: Date,
        promoValidUntil: Date
    }) {
        try {
            const result = await Promo.query().insert({
                storeId,
                promoCode,
                promoMinPrice,
                promoPicture,
                promoTotal,
                promoValidFrom,
                promoValidUntil
            });
            return result;
        } catch (err) {
            throw err;
        }
    }
}