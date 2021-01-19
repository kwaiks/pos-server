import InventoryService from "@/services/inventoryService";
import { Router } from "express";

const router = Router();

router.get("/store/:storeId", async (req,res) => {
    const { storeId } = req.params;
    try {
        const result = await InventoryService.getInventories(Number(storeId));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/detail/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await InventoryService.getInventoryById(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/edit", async (req,res) => {
    const inventory = req.body;
    try {
        const result = await InventoryService.editInventory(inventory);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/add", async (req,res) => {
    const inventory = req.body;
    try {
        const result = await InventoryService.addInventory(inventory);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

export default router;