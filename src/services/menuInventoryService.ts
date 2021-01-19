import MenuInventory from "@/models/menuInventory";

export default class MenuInventoryService {
    static async addInventory(
        menuId: number, inventoryId: number, total: number){
            try {
                await MenuInventory.query().insert({
                    inventoryId,
                    inventoryTotal: total,
                    menuId
                });
                return true;
            } catch (err) {
                throw err;
            }
    }

    static async removeInventory(id: number){
        try {
            await MenuInventory.query().del().where("id",id);
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async getInventoryByMenu(menuId: number){
        try {
            const result = await MenuInventory.query()
                                                .select([
                                                    "id",
                                                    "inventoryTotal",
                                                    "inventoryStock",
                                                    "inventoryUnit"
                                                ])
                                                .innerJoin(
                                                    "inventory",
                                                    "inventory.id",
                                                    "=",
                                                    "menuInventory.inventoryId"
                                                ).where("menuId", menuId);
            return result;
        } catch (err) {
            throw err;
        }
    }
}