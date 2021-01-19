import { Request, Response} from "express";
import jwt from "jsonwebtoken";

export const verifyToken =  async (
        req: Request, res: Response, next: Function) => {
    if (process.env.NODE_ENV === "development" || 
        process.env.NODE_ENV === "test") {
        const token: string = req.headers["authorization"];
        if (token === process.env.DEVELOPMENT_ACCESS_KEY) {
            return next();
        }
    }
    try {
        const token: string = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        return next();
    } catch(err) {
        res.sendStatus(401);
    }  
};