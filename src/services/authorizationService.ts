import jwt from "jsonwebtoken";
import LoginHistory from "@/models/loginHistory";
import AppError from "@/utils/error";

export interface AuthInterface {
    id?: number;
    userId?: number;
    email?: string;
    type?: "admin" | "user" | "customer";
    ipAddress?: string;
    browser?: string;
    operatingSystem?: string;
    device?: string;
    token?: string;
    refreshToken?: string;
}

export class AuthorizationService {
    static async login(auth: AuthInterface) {
        try {
            const result = await LoginHistory.query()
                                                .insert(auth);
            return result.token;
        } catch (err) {
            throw err;
        }
    }

    static async refresh(accessToken: string, auth: AuthInterface) {
        try {
            const token = await LoginHistory.query()
                                            .select(["id","refreshToken"])
                                            .first()
                                            .orderBy("id", "desc")
                                            .where("ipAddress", auth.ipAddress)
                                            .where("browser", auth.browser)
                                            .where("device", auth.device)
                                            .where("loggedIn", true)
                                            .where(
                                                "operatingSystem", 
                                                auth.operatingSystem)
                                            .where("token", accessToken);
            const refresh = jwt.verify(
                token.refreshToken, 
                process.env.REFRESH_SECRET_KEY);
            const tokenData = jwt.decode(accessToken);
            if (
                JSON.stringify(refresh["data"]) 
                    !== JSON.stringify(tokenData["data"])){
                throw new AppError("token_invalid");
            }
            const newToken = jwt.sign({
                data: refresh["data"]
            }, process.env.ACCESS_SECRET_KEY, {
                expiresIn: "30m"
            });
            // blacklist another token
            await LoginHistory.query()
                                .patch({
                                    loggedIn:false,
                                })
                                .where("ipAddress", auth.ipAddress)
                                .where("browser", auth.browser)
                                .where("device", auth.device)
                                .where("loggedIn", true)
                                .where(
                                    "operatingSystem", 
                                    auth.operatingSystem)
                                .whereNot("id", token.id);

            // update new Token
            await LoginHistory.query().patch({
                token: newToken
            }).where("id", token.id);
            return newToken;
        } catch (err){
            throw err;
        }
    }

    static async logout(accessToken: string) {
        try {
            await LoginHistory.query()
                                .patch({
                                    loggedIn: false
                                })
                                .where("token", accessToken);
        } catch (err) {
            throw err;
        }
    }
}