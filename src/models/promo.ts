import { Model } from "objection";

export default class Promo extends Model {
    id: number;
    storeId: number;
    promoCode: string;
    promoPicture: string;
    promoMinPrice: number;
    promoValidFrom: Date;
    promoValidUntil: Date;
    promoTotal: number;
    deleted: boolean;

    static tableName = "promo";

    static jsonSchema = {
        type: "object",
        required: ["promoCode", "promoPicture", "promoValidUntil", "storeId"],
        properties: {
            id: { type: ["number", "string"]},
            storeId: { type: ["number", "string"]},
            promoCode: { type: "string" },
            promoPicture: { type: "string" },
            promoMinPrice: { type: "number" },
            promoTotal: { type: "number" }
        }
    }
}