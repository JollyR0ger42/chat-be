"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('YO!!!');
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app_config_1 = __importDefault(require("./app.config"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT || '3000');
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, app_config_1.default)(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
