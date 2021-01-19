import Menu from "@/models/menu";
import MenuInventory from "@/models/menuInventory";
import {Store} from "@/models/store";
import { PartialModelObject } from "objection";
import differentObjects from "@/utils/differentObjects";
import AppError from "@/utils/error";
import StoreMenuCategory from "@/models/storeMenuCategory";

interface MenuItem extends PartialModelObject<Menu> {
    // id: number;
    // storeId: number;
    // menuName: string;
    // menuPhoto: string;
    // menuPrice: number;
    // menuStock: number;
    // menuDescription: string;
    // menuCode: string;
    // menuDiscountPercent: number;
    // menuDiscountPrice: number;
    // categoryId: number;
    inventories: [];
    newInventories: [];
}

export default class MenuService {

    async addProduct(menu: MenuItem){
        const { storeId } = menu;
        try {
            const store = await Store.query()
                                        .select("id")
                                        .where("deleted",false)
                                        .where("id", storeId)
                                        .first();
            if ( typeof store === "undefined" ) { 
                throw new AppError("store_not_found");
            }
            const result = await Menu.query().insert(menu);
            await MenuInventory.query().insert(menu.newInventories);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async editProduct(menu: MenuItem){
        console.log("e",menu);
        const inventories = {
            new:
        differentObjects(menu.newInventories, menu.inventories, "id"),
            removed: differentObjects(
                        menu.inventories, menu.newInventories, "id")
        };
        const mappedNewInventories = inventories.new.map((val) => {
            const item:any = 
                menu.newInventories.filter((obj:any)=> obj.id === val)[0];
            return {
                inventoryId: item.id,
                menuId: menu.id,
                inventoryTotal: item.inventoryTotal
            };
        });
        try {
            await Promise.all([
                MenuInventory.query().del().whereIn(
                                        "inventoryId", inventories.removed)
                                        .where("menuId", menu.id),
                MenuInventory.query().insert(mappedNewInventories)
            ]);
            const result = await Menu.query().patch(menu).where({id: menu.id});
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getMenuByStoreId(storeId: number){
        try {
            const result = await Menu.query().select(
                "menu.id",
                "menu.storeId",
                "menuName",
                "menuPhoto",
                "menuPrice",
                "menuStock",
                "menuDescription",
                "menuCode",
                "menuCategoryName",
                "isDiscount",
                "menuDiscountValue",
                "menuDiscountType")
            .where("menu.deleted", false)
            .leftJoin("storeMenuCategory",
                    "storeMenuCategory.id","=","menu.menuCategoryId")
            .where("menu.storeId", storeId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getStoreMenuByPage(
        storeId: number, page: number, size: number) {
            try {
                const result = await Menu.query().select(
                        "id",
                        "storeId",
                        "menuName",
                        "menuPhoto",
                        "menuPrice",
                        "menuStock",
                        "menuDescription",
                        "menuCode",
                        "isDiscount",
                        "menuDiscountValue",
                        "menuDiscountType")
                    .where("deleted", false)
                    .where("storeId", storeId)
                    .page(page,size);
                return result;
            } catch (err) {
                throw err;
            }
    }

    async getMenuDetail(menuId: number) {
        try {
            const result = await Menu.query().select(
                    "id",
                    "storeId",
                    "menuName",
                    "menuPhoto",
                    "menuPrice",
                    "menuStock",
                    "menuCategoryId",
                    "menuDescription",
                    "menuCode",
                    "isDiscount",
                    "menuDiscountValue",
                    "menuDiscountType")
                .where("id", menuId)
                .where("deleted",false)
                .withGraphFetched("inventories")
                .modifyGraph("inventories", b => {
                    b.select([
                        "menuInventory.id", 
                        "inventoryName",
                        "inventoryMinStock",
                        "inventoryStock",
                        "inventoryPrice",
                        "inventoryUnit",
                        "inventoryCode"])
                        .innerJoin(
                            "inventory", 
                            "inventory.id", 
                            "=", "menuInventory.id");
                }).first();
            if (typeof result === "undefined") {
                throw new AppError("menu_not_found");
            }
            return result;
        } catch (err) {
            throw err;
        }
    }

    async removeProduct(menuId: number) {
        try {
            await Menu.query().patch({deleted: true}).where("id", menuId);
            return menuId;
        } catch (err) {
            throw err;
        }
    }



    async addMenuCategory(data: PartialModelObject<StoreMenuCategory>) {
        try {
            const result = await StoreMenuCategory.query().insert(data);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async removeMenuCategory(id: number) {
        try {
            const result = await StoreMenuCategory.query().patch({
                deleted: true
            }).where("id", id);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getMenuCategory(storeId: number) {
        try {
            const result = await StoreMenuCategory.query().select(
                "menuCategoryName",
                "storeId",
                "id")
            .where("storeId", storeId)
            .where("deleted", false);
            return result;
        } catch (err) {
            throw err;
        }
    }
    
}