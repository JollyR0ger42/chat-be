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
const express_1 = __importDefault(require("express"));
const authRequired_1 = __importDefault(require("../middleware/authRequired"));
const controller_1 = __importDefault(require("../controller"));
const token_1 = __importDefault(require("../src/token"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield controller_1.default.Users().addUser(req.body.login, req.body.password);
    if (user) {
        const token = token_1.default.generate(user);
        res.cookie('token', token, { httpOnly: true });
        res.send({ login: user.login });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield controller_1.default.Users().getUser(req.body.login);
    if ((user === null || user === void 0 ? void 0 : user.password) === req.body.password) {
        const token = token_1.default.generate(user);
        res.cookie('token', token, { httpOnly: true });
        res.send({ login: user.login });
    }
    else {
        res.status(401).send({ Error: 'Unauthorized' });
    }
}));
router.get('/users', authRequired_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield controller_1.default.Users().getAll(req.user.login));
}));
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send();
});
router.post('/messages', authRequired_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiver = yield controller_1.default.Users().getUser(req.body.receiver);
    controller_1.default.Messages().addMessage({
        message: req.body.message,
        receiver: receiver.login,
        sender: req.user.login
    });
    res.send();
}));
router.get('/messages/:receiver', authRequired_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiver = yield controller_1.default.Users().getUser(req.params.receiver);
    if (receiver) {
        const chat = yield controller_1.default.Messages().getChat(req.user.login, receiver.login);
        console.log('chat', chat);
        res.send(chat);
    }
}));
function routes(app) {
    app.use('/', router);
}
exports.default = routes;
