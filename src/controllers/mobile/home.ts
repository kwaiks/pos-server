import { Router } from "express";
import StoreService from "@/services/storeService";

const router = Router();
const storeService = new StoreService();

router.get("/nearest-store", async (req,res) => {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    try {
        const result = await storeService.getNearestStore(lat, lng);
        res.success(result);    
    } catch (err) {
        res.error(err);
    }
});

router.get("/top-store", async (req,res) => {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    try {
        const result = await storeService.getTopStore(lat, lng);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/store/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await storeService.getStoreByIdMobile(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

export default router;