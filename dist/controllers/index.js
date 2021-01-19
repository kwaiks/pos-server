"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = (app) => {
    const router = express_1.Router();
    router.get('/', (_req, res) => {
        res.status(200).send("OK");
    });
    app.use(router);
};
//# sourceMappingURL=index.js.map