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
const token_1 = __importDefault(require("../src/token"));
const controller_1 = require("../controller");
const authRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const target = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    let user, iat;
    try {
        user = token_1.default.verify(target);
        iat = user.iat;
        user = yield (0, controller_1.Users)().getUser(user.login);
    }
    catch (e) {
        console.log(e);
        const err = new Error('Unauthorized');
        res.status(401);
        return next(err);
    }
    const createdAt = iat * 1000; // token has it in seconds
    let timePass = new Date().getTime() - createdAt;
    timePass = timePass / 1000 / 60 / 60; // in hours
    if (timePass >= 24) {
        const newToken = token_1.default.generate({ login: user.login });
        res.append('Set-Cookie', `token=${newToken}; HttpOnly;`);
    }
    req.user = Object.assign(Object.assign({}, user), { password: '' });
    return next();
});
exports.default = authRequired;
