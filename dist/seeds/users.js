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
exports.seed = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPassword = yield bcrypt_1.default.hash("adminpassword", 1);
        const vendorPassword = yield bcrypt_1.default.hash("vendorpassword", 1);
        const userPassword = yield bcrypt_1.default.hash("userpassword", 1);
        // Deletes ALL existing entries
        yield knex("users").del();
        // Inserts seed entries
        yield knex("users").insert([
            {
                email: "admin@mesan.com",
                password: adminPassword,
                phone_number: "85715565340",
                first_name: "Admin",
                last_name: "Mesan",
                role: "admin",
                updated_at: (new Date).toISOString(),
                created_at: (new Date).toISOString(),
            },
            {
                email: "vendor@mesan.com",
                password: vendorPassword,
                phone_number: "85715565341",
                first_name: "Vendor",
                last_name: "Mesan",
                role: "vendor",
                updated_at: (new Date).toISOString(),
                created_at: (new Date).toISOString(),
            },
            {
                email: "user@mesan.com",
                password: userPassword,
                phone_number: "85715565342",
                first_name: "User",
                last_name: "Mesan",
                role: "user",
                updated_at: (new Date).toISOString(),
                created_at: (new Date).toISOString(),
            },
        ]);
    });
}
exports.seed = seed;
;
//# sourceMappingURL=users.js.map