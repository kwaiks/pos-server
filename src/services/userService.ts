import bcrypt from "bcrypt";
import { User, UserItem } from "@/models/users";
import AppError from "@/utils/error";

export default class UserServiceInstance {

    //Get Single user by email
    static async findUsersByEmail(email:string) {
        try {
            const user = await User.query().select([
                                        "id",
                                        "userFirstName",
                                        "userLastName",
                                        "userPicture",
                                        "userEmail"
                                    ])
                                    .where("userEmail", email).first();
            if (typeof user === "undefined") { 
                throw new AppError("user_not_found");
            };
            return user;
        }catch(err){
            throw err;
        }
    }

    // Get All User
    static async getAllUsers() {
        try {
            const result = await User.query().select([
                                                "id",
                                                "userEmail",
                                                "userFirstName",
                                                "userLastName",
                                                "userPhoneNumber",
                                                "userPicture",
                                                "userVerified"
                                            ]).where("deleted", false);
            return result;
        } catch (err) {
            throw err;
        }
    }

    //Edit User
    static async editUser(user: UserItem) {
        try {
            await User.query().patch({
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userPhoneNumber: user.userPhoneNumber,
                userPicture: user.userPicture
            }).where("id", user.id);
            return "Success";
        } catch (err) {
            throw err;
        }
    }

    static async deleteUser(id: number) {
        try {
            await User.query().patch({
                deleted: true
            }).where("id", id);
            return "Success";
        } catch (err) {
            throw err;
        }
    }

    static async changePassword(
        email: string, 
        oldPassword: string,
        newPassword: string
    ){
        try {
            const user = await User.query()
                                    .select(["id","userPassword"])
                                    .where("userEmail", email)
                                    .first();
            if (typeof user === "undefined") {
                throw new AppError("user_not_found");
            }
            if (! await bcrypt.compare(oldPassword, user.userPassword)) {
                throw new AppError("password_incorrect");
            }
            newPassword = await bcrypt.hash(newPassword, 10);
            await User.query().patch({
                userPassword: newPassword
            }).where("id", user.id);
            return "Success";
        } catch (err) {
            throw err;
        }
    }
}

