import { Router } from "express";
import jwt from "jsonwebtoken";
import AuthService from "@/services/authenticationService";
import { 
    AuthInterface, 
    AuthorizationService 
} from "@/services/authorizationService";

const router = Router();

router.post("/admin/login", async (req,res)=>{
    const { email, password } = req.body;
    const auth: AuthInterface = {
        browser: req.useragent.browser,
        ipAddress: req.ip,
        device: req.useragent.platform,
        email,
        operatingSystem: req.useragent.os,
        type: "admin",
    };
    try {
        const result = await AuthService.loginAdmin(email,password, auth);
        res.success(result);
    }catch(err){
        res.error(err);
    }
});

router.post("/customer/login", async (req,res)=>{
    const { email, password } = req.body;
    const auth: AuthInterface = {
        browser: req.useragent.browser,
        ipAddress: req.ip,
        device: req.useragent.platform,
        email,
        operatingSystem: req.useragent.os,
        type: "customer",
    };
    try {
        const result = await AuthService.loginCustomer(email,password, auth);
        res.success(result);
    }catch(err){
        res.error(err);
    }
});

router.post("/user/login", async (req,res)=>{
    const { email, password } = req.body;
    const auth: AuthInterface = {
        browser: req.useragent.browser,
        ipAddress: req.ip,
        device: req.useragent.platform,
        email,
        operatingSystem: req.useragent.os,
        type: "user",
    };
    try {
        const result = await AuthService.loginUser(email,password, auth);
        res.success(result);
    }catch(err){
        res.error(err);
    }
});

router.get("/logout", async (req,res) => {
    try {
        const token: string = req.headers["authorization"].split(" ")[1];
        await AuthorizationService.logout(token);
        res.success();
    }catch(err){
        res.error(err);
    }
});

// router.post("/register", async (req,res) => {
//     const user = req.body;
//     try {
//         const result = await AuthService.register(user);
//         res.status(200).send(result);
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(202);
//     }
// });

router.get("/refresh", async (req, res) => {
    const auth: AuthInterface = {
        browser: req.useragent.browser,
        ipAddress: req.ip,
        device: req.useragent.platform,
        operatingSystem: req.useragent.os,
    };
    try {
        const token: string = req.headers["authorization"].split(" ")[1];
        const user = jwt.decode(token);
        auth.email = user["data"]["email"];
        auth.type = user["data"]["type"];
        const newToken = await AuthorizationService.refresh(token, auth);
        res.cookie("ATKN", newToken, {
            httpOnly: true,
            path: "/"
        });
        res.send({newToken});
    } catch (err) {
        console.log("refresh",err);
        res.sendStatus(500);
    }
});

export default router;