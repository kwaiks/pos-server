import { Router } from "express";
import StoreService from "@/services/storeService";

const router = Router();
const storeService = new StoreService();

router.get("/detail/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await storeService.getStoreByIdMobile(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

export default router;