"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("@/controllers/index"));
exports.default = () => {
    dotenv_1.default.config();
    const app = express_1.default();
    index_1.default(app);
    app.use(body_parser_1.default.urlencoded({
        extended: false,
        limit: "20mb"
    }));
    app.use(body_parser_1.default.json({ limit: "20mb" }));
    app.listen(3000, () => {
        console.log("Server Started");
    });
};
//# sourceMappingURL=index.js.map