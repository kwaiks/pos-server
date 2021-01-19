import { Router } from "express";
import { menuImage } from "@/middlewares/uploadFile";
import MenuService from "@/services/menuService";
import MenuInventoryService from "@/services/menuInventoryService";

const router = Router();
const menuService = new MenuService();

router.get("/store/:storeId", async (req, res) => {
    const { storeId } = req.params;
    try {
        const result = await menuService.getMenuByStoreId(Number(storeId));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/detail/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await menuService.getMenuDetail(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/add", menuImage.single("image") ,async (req,res) => {
    try {
        const menu = JSON.parse(req.body.data);
        menu.menuPicture = req.body.itemPicture;
        const result = await menuService.addProduct(menu);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/edit", menuImage.single("image"), async (req, res) => {
    try {
        const menu = JSON.parse(req.body.data);
        menu.menuPhoto = req.body.itemPicture;
        const result = await menuService.editProduct(menu);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.delete("/remove/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await menuService.removeProduct(Number(id));
        res.success(result);
    } catch (err) {
        res.error(500);
    }
});

router.get("/get-inventory/:menuId", async (req,res) => {
    const { menuId } = req.params;
    try {
        const result = await MenuInventoryService
                            .getInventoryByMenu(Number(menuId));
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post("/add-inventory", async (req,res) => {
    const {menuId, inventoryId, total} = req.body;
    try {
        await MenuInventoryService.addInventory(menuId, inventoryId, total);
        res.json({success: true});
    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete("/remove-inventory/:id", async (req,res) => {
    const { id } = req.params;
    try {
        await MenuInventoryService.removeInventory(Number(id));
        res.json({success: true});
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get("/menu-category/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await menuService.getMenuCategory(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/menu-category", async (req,res) => {
    const data = req.body;
    try {
        const result = await menuService.addMenuCategory(data);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.delete("/menu-category/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await menuService.removeMenuCategory(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

export default router;