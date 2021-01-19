"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("@/models/users"));
class AuthService {
    constructor() {
        this.user = null;
    }
    // Login
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.user = yield users_1.default.query().select(1).where('email', email)[0];
                if (!this.user)
                    throw "User not found";
                yield this.verifyPassword(password);
                const token = jsonwebtoken_1.default.sign(this.getTokenData, "Test", {
                    expiresIn: "10h"
                });
                return { success: true, data: token };
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    verifyPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield bcrypt_1.default.compare(password, this.user.password))) {
                    throw "Password doesn't match";
                }
                ;
                return true;
            }
            catch (err) {
                return err;
            }
        });
    }
    getTokenData() {
        return {
            email: this.user.email,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            phoneNumber: this.user.phoneNumber,
            profilePicture: this.user.profilePicture
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=authService.js.map