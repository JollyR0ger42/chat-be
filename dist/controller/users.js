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
function default_1(collection) {
    const addUser = (login, password) => __awaiter(this, void 0, void 0, function* () {
        let newUser;
        try {
            newUser = yield collection.insertOne({ login, password });
        }
        catch (e) {
            console.log(e);
        }
        if (newUser)
            return { login };
        else
            return false;
    });
    const getUser = (login) => __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield collection.findOne({ login });
        }
        catch (e) {
            console.log(e);
        }
        return user;
    });
    const getAll = (login) => __awaiter(this, void 0, void 0, function* () {
        let users;
        try {
            users = yield collection
                .find({ login: { $ne: login } }, { projection: { _id: 0, login: 1 } })
                .toArray();
        }
        catch (e) {
            console.log(e);
        }
        return users;
    });
    return {
        addUser,
        getUser,
        getAll,
    };
}
exports.default = default_1;
;
