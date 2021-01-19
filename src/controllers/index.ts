import { Application, Router } from "express";
import { verifyToken } from "@/middlewares/jwt";
import Auth from "./auth";
import Store from "./store";
import Menu from "./menu";
import User from "./user";
import Master from "./master";
import Inventory from "./inventory";
import Mobile from "./mobile";

export default (app: Application) => {
    const router = Router();

    // mobile route
    router.use("/mobile", Mobile);

    router.use("/auth", Auth);

    // Protected routes
    router.use("/store", verifyToken, Store);
    router.use("/menu", verifyToken, Menu);
    router.use("/user", verifyToken, User);
    router.use("/master", verifyToken, Master);
    router.use("/inventory", verifyToken, Inventory);

    router.get("/", (_req, res) => {
        res.status(200).send("OK");
    });
    app.use("/api", router);
};