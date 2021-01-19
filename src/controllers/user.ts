import { Router } from "express";
import UserService from "@/services/userService";
import { User } from "@/models/users";

const router = Router();

router.get("/user-email/:email", async (req, res) => {
    const email = req.params.email;
    try {
        const result = await UserService.findUsersByEmail(email);
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.get("/users", async (_req,res) => {
    try {
        const result = await UserService.getAllUsers();
        res.success(result);
    } catch (err) {
        res.error(err);
    }
});

router.post("/edit-user", async (req,res) => {
    const user = req.body;
    try {
        await UserService.editUser(user);
        res.success();
    } catch (err) {
        res.error(err);
    }
});

router.delete("/remove-user/:id", async (req,res) => {
    const id = Number(req.params.id);
    try {
        await UserService.deleteUser(id);
        res.success();
    } catch (err) {
        res.error(err);
    }
});

router.post("/change-password", async (req,res) => {
    const {email, oldPassword, newPassword} = req.body;
    try {
        await UserService.changePassword(email, oldPassword, newPassword);
        res.success();
    } catch (err) {
        res.error(err);
    }
});

export default router;
