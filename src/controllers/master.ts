import { Router } from "express";
import MasterService from "@/services/masterService";

const router = Router();

router.get("/facility", async (_req,res) => {
    try {
        const result = await MasterService.getFacilities();
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/facility", async (req,res) => {
    try {
        const { facilityName } = req.body;
        const result = await MasterService.addFacility(facilityName);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/menu-category", async (_req,res) => {
    try {
        const result = await MasterService.getMenuCategories();
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/menu-category", async (req,res) => {
    try {
        const { menuCategoryName } = req.body;
        const result = await MasterService.addMenuCategory(menuCategoryName);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/store-category", async (_req,res) => {
    try {
        const result = await MasterService.getStoreCategories();
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/store-category", async (req,res) => {
    try {
        const { storeCategoryName } = req.body;
        const result = await MasterService.addStoreCategory(storeCategoryName);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/province", async (req,res) => {
    try {
        const result = await MasterService.getAllProvince();
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/province", async (req,res) => {
    try {
        const { provinceName } = req.body;
        const result = await MasterService.addProvince(provinceName);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

export default router;