import Inventory from "@/models/inventory";
import AppError from "@/utils/error";

interface InventoryItem {
    id: number;
    storeId: number;
    inventoryName: string;
    inventoryMinStock: number;
    inventoryStock: number;
    inventoryPrice: number;
    inventoryUnit: string;
    inventoryCode: string;
}

export default class InventoryService {
    static async getInventories(storeId: number) {
        try {
            const result = await Inventory.query()
                                            .select([
                                                "id",
                                                "inventoryCode",
                                                "inventoryMinStock",
                                                "inventoryName",
                                                "inventoryPrice",
                                                "inventoryStock",
                                                "inventoryUnit"])
                                            .where("storeId", storeId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getInventoryById(id: number) {
        try {
            const result = await Inventory.query()
                                            .select([
                                                "id",
                                                "storeId",
                                                "inventoryCode",
                                                "inventoryMinStock",
                                                "inventoryName",
                                                "inventoryPrice",
                                                "inventoryStock",
                                                "inventoryUnit"])
                                            .where("id", id).first();
            if (typeof result === "undefined") {
                throw new AppError("inventory_not_found");
            }
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async addInventory(item: InventoryItem) {
        try {
            const result = await Inventory.query().insert(item);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async editInventory(item: InventoryItem) {
        try {
            const result = await Inventory.query()
                                            .patch(item)
                                            .where("id", item.id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}