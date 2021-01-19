import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, AdminItem } from "@/models/admin";
import AppError from "@/utils/error";
import { AuthInterface, AuthorizationService } from "./authorizationService";
import { Customer, CustomerItem } from "@/models/customer";
import { User, UserItem } from "@/models/users";

export default class AuthenticationService {

    // Login - Admin
    static async loginAdmin(
        email:string, password: string, auth: AuthInterface) {
        try {
            const user = await Admin.query()
                                    .select("*")
                                    .where("adminEmail", email)
                                    .first();
            // if email not found
            if (user === null || typeof user === "undefined") {
                throw new AppError("user_not_found");
            }; 
            // compare password
            await this.verifyPassword(password, user.adminPassword); 
            auth.userId = user.id;
            auth.token = jwt.sign(
                {
                    data:this.getAdminTokenData(user)
                }, 
                process.env.ACCESS_SECRET_KEY, {
                    expiresIn: "15m"
                }
            );
            auth.refreshToken = jwt.sign(
                {
                    data:this.getAdminTokenData(user)
                }, 
                process.env.REFRESH_SECRET_KEY, 
                {
                    expiresIn: "365d"
                }
            );
            const result = await AuthorizationService.login(auth);
            return {
                token: result,
                user: this.getAdminTokenData(user)
            };
        }catch(err){
            // check if error known
            if (err instanceof AppError){
                throw err;
            }
            // if error not found, pass original error
            throw new AppError("unknown", err);
        }
    }

    // Login - User / Vendor
    static async loginUser(
        email:string, password: string, auth: AuthInterface) {
        try {
            const user = await User.query()
                                    .select("*")
                                    .where("userEmail", email)
                                    .withGraphFetched("stores")
                                    .modifyGraph("stores", b => {
                                        b.select(["id", "storeName"]);
                                    })
                                    .first();
            // if email not found
            if (user === null || typeof user === "undefined") {
                throw new AppError("user_not_found");
            }; 
            // compare password
            await this.verifyPassword(password, user.userPassword); 
            auth.userId = user.id;
            auth.token = jwt.sign(
                {
                    data:this.getUserTokenData(user)
                }, 
                process.env.ACCESS_SECRET_KEY, {
                    expiresIn: "15m"
                }
            );
            auth.refreshToken = jwt.sign(
                {
                    data:this.getUserTokenData(user)
                }, 
                process.env.REFRESH_SECRET_KEY, 
                {
                    expiresIn: "365d"
                }
            );
            const result = await AuthorizationService.login(auth);
            return {
                token: result,
                user: this.getUserTokenData(user),
                stores: user.stores
            };
        }catch(err){
            console.log(err);
            // check if error known
            if (err instanceof AppError){
                throw err;
            }
            // if error not found, pass original error
            throw new AppError("unknown", err);
        }
    }

    // Login - Customer
    static async loginCustomer(
        email:string, password: string, auth: AuthInterface) {
        try {
            const user = await Customer.query()
                                    .select("*")
                                    .where("customerEmail", email)
                                    .first();
            // if email not found
            if (user === null || typeof user === "undefined") {
                throw new AppError("user_not_found");
            }; 
            // compare password
            await this.verifyPassword(password, user.customerPassword); 
            auth.userId = user.id;
            auth.token = jwt.sign(
                {
                    data:this.getCustomerTokenData(user)
                }, 
                process.env.ACCESS_SECRET_KEY, {
                    expiresIn: "15m"
                }
            );
            auth.refreshToken = jwt.sign(
                {
                    data:this.getCustomerTokenData(user)
                }, 
                process.env.REFRESH_SECRET_KEY, 
                {
                    expiresIn: "365d"
                }
            );
            const result = await AuthorizationService.login(auth);
            return {
                token: result, user: 
                this.getCustomerTokenData(user)
            };
        }catch(err){
            // check if error known
            if (err instanceof AppError){
                throw err;
            }
            // if error not found, pass original error
            throw new AppError("unknown", err);
        }
    }

    // Verify attempted user login
    static async verifyPassword(password: string, hashedPassword: string) {
        try {
            if (!await bcrypt.compare(password, hashedPassword)){
                throw new AppError("password_incorrect");
            };
            return true;
        }catch(err) {
            if (err instanceof AppError){
                throw err;
            }
            throw new AppError("unknown", err);
        }
    }

    // JWT Payload User
    static getUserTokenData(user: UserItem) {
        return {
            email: user.userEmail,
            firstName: user.userFirstName,
            lastName: user.userLastName,
            phoneNumber: user.userPhoneNumber,
            profilePicture: user.userPicture,
            type: "user"
        };
    }

    // JWT Payload Customer
    static getCustomerTokenData(user: CustomerItem) {
        return {
            email: user.customerEmail,
            firstName: user.customerFirstName,
            lastName: user.customerLastName,
            phoneNumber: user.customerPhoneNumber,
            profilePicture: user.customerPicture,
            type: "customer"
        };
    }

    // JWT Payload Admin
    static getAdminTokenData(user: AdminItem) {
        return {
            email: user.adminEmail,
            name: user.adminName,
            role: user.adminRole,
            type: "admin"
        };
    }
}

