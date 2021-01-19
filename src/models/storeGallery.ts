import { Model } from "objection";

export default class StoreGallery extends Model {
    id: number;
    storeId: number;
    mediaPath: string;
    mediaType: "image" | "video" | "image_360" | "video_360";
    createdAt: Date;
    updatedAt: Date;

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static tableName = "storeGallery";

    static jsonSchema = {
        type: "object",
        required: ["storeId", "mediaPath", "mediaType"],
        properties: {
            storeId: {type: ["number","string"]},
            mediaPath: {type: "string"},
            mediaType: {type: "string"}
        }
    }
}