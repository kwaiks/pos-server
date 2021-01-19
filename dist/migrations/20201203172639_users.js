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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('users', t => {
            t.bigIncrements('id').notNullable().unique().primary();
            t.string('email', 50).unique().notNullable();
            t.string('password', 255);
            t.string('phone_number', 25);
            t.string('first_name', 50).notNullable();
            t.string('last_name', 50);
            t.string('role', 10);
            t.string('profile_picture', 500);
            t.timestamp('updated_at');
            t.timestamp('created_at');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('users');
    });
}
exports.down = down;
//# sourceMappingURL=20201203172639_users.js.map