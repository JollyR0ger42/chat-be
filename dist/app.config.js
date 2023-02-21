"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("./middleware/cors"));
const routes_1 = __importDefault(require("./src/routes"));
function configureApp(app) {
    app.use(cors_1.default);
    app.use((0, cookie_parser_1.default)());
    (0, routes_1.default)(app);
}
exports.default = configureApp;
