import express from 'express';
import authRequired from '../middleware/authRequired';
import { Users, Messages } from '../controller';
import Token from '../src/token';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/signup', async (req, res) => {
  const user = await Users().addUser(req.body.login, req.body.password);
  if (user) {
    const token = Token.generate(user);
    res.cookie('token', token, { httpOnly: true });
    res.send({ login: user.login });
  }
});

router.post('/login', async (req, res) => {
  const user = await Users().getUser(req.body.login);
  if (user?.password === req.body.password) {
    const token = Token.generate(user);
    res.cookie('token', token, { httpOnly: true });
    res.send({ login: user.login });
  } else {
    res.status(401).send({ Error: 'Unauthorized' });
  }
});

router.get('/users', authRequired, async (req, res) => {
  res.send(await Users().getAll(req.user.login));
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.send();
});

router.post('/messages', authRequired, async (req, res) => {
  const receiver = await Users().getUser(req.body.receiver);
  Messages().addMessage({
    message: req.body.message,
    receiver: receiver.login,
    sender: req.user.login
  });
  res.send();
});

router.get('/messages/:receiver', authRequired, async (req, res) => {
  const receiver = await Users().getUser(req.params.receiver);
  if (receiver) {
    const chat = await Messages().getChat(req.user.login, receiver.login);
    console.log('chat', chat);
    res.send(chat);
  }
});

export default function routes(app: express.Application) {
  app.use('/', router);
}