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
const mongodb_1 = require("mongodb");
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'chat-app';
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(url);
        console.log('DB start connecting...');
        yield client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        return db;
    });
}
exports.default = dbConnect;
