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
    function addMessage(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let newMessage;
            try {
                newMessage = yield collection.insertOne(payload);
            }
            catch (e) {
                console.log(e);
            }
            if (newMessage)
                return newMessage.ops[0];
            else
                return false;
        });
    }
    function getChat(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            let chat;
            try {
                chat = yield collection
                    .find({
                    $or: [
                        { sender, receiver },
                        { sender: receiver, receiver: sender },
                    ],
                })
                    .toArray();
            }
            catch (e) {
                console.log(e);
            }
            if (chat) {
                return chat.map(({ sender, receiver, message, timestamp }) => ({ sender, receiver, message, timestamp }));
            }
            else
                return false;
        });
    }
    return {
        addMessage,
        getChat,
    };
}
exports.default = default_1;
