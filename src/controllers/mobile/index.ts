import { Router } from "express";
import home from "./home";
import store from "./store";

const router = Router();

router.use("/home", home);
router.use("/store", store);

export default router;