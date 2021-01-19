import { Router } from "express";
import StoreService from "@/services/storeService";
import { storeImage, storeGalleryImage } from "@/middlewares/uploadFile";
import fs from "fs";

const router = Router();
const storeService = new StoreService();

router.get("/stores/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await storeService.getStoreById(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/stores", async (_req, res) => {
    try {
        const result = await storeService.getStore();
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/stores-page", async (req,res) => {
    const { page, size } = req.query;
    try {
        const { results, total } = await storeService
                            .getStoreByPage(Number(page), Number(size));
        res.success({
            results,
            total
        });
    } catch (err) {
        res.error(err);
    }
});

router.post("/add-store", storeImage.single("image"), async (req, res) => {
    try {
        // Parse JSON String
        const store = JSON.parse(req.body.data);
        // add picture from multer generated path
        store.storePicture = req.body.storePicture;
        await storeService.addStore(store);
        res.success();
    } catch (err) {
        res.error(err);
    }
});

router.post("/edit-store", storeImage.single("image"), async (req, res) => {
    try {
        // Parse JSON String
        const store = JSON.parse(req.body.data);
        // add picture from multer generated path
        store.storePicture = req.body.storePicture;
        await storeService.editStore(store);
        res.success();
    } catch (err) {
        res.error(err);
    }
});

router.delete("/remove-store/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await storeService.removeStore(Number(id));
        res.success();
    } catch (err) {
        res.error(err);
    }
});

router.get("/gallery/:storeId", async (req,res) => {
    const { storeId } = req.params;
    try {
        const result = await storeService.getStoreGallery(Number(storeId));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/gallery", storeGalleryImage.single("image"), async (req,res) => {
    try {
        const data = JSON.parse(req.body.data);
        if (req.body.mediaPath) {
            data.mediaPath = req.body.mediaPath;
        }
        const result = await storeService.addStoreMedia(data);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.delete("/gallery/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const result = await storeService.removeStoreMedia(Number(id));
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/tes", (req,res) => {
    const result = fs.existsSync(
        "public/images/store/gallery/uKLU5lZAnr1609721810715.png");
    res.send(result);
});

export default router;