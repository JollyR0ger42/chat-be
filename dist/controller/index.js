"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const users_1 = __importDefault(require("./users"));
const messages_1 = __importDefault(require("./messages"));
let db, Users, Messages;
(0, db_1.default)().then((payload) => {
    db = payload;
    Users = (0, users_1.default)(db.collection('users'));
    Messages = (0, messages_1.default)(db.collection('messages'));
});
exports.default = {
    Users: () => Users,
    Messages: () => Messages
};
