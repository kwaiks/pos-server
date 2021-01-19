"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Users extends objection_1.Model {
}
exports.default = Users;
// table name
Users.tableName = 'users';
// Optional JSON Schema
Users.jsonSchema = {
    type: 'object',
    required: ['email'],
    properties: {
        id: { type: 'number' },
        email: { type: 'string', minLength: 1 },
        password: { type: ['string', 'null'] },
        firstName: { type: 'string', minLength: 1, maxLength: 50 },
        lastName: { type: 'string', minLength: 1, maxLength: 50 },
        phoneNumber: { type: 'string', minLength: 1, maxLength: 25 },
        profilePicture: { type: 'string' }
    }
};
// Modifiers
Users.modifiers = {
    // search user by email
    searchByEmail(query, email) {
        query.where('email', email);
    }
};
//# sourceMappingURL=users.js.map