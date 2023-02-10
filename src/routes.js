const authRequired = require('../middleware/authRequired.js')
const { Users, Messages } = require('../controller')
const Token = require('../src/token.js')


module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/signup', async (req, res) => {
    const user = await Users.addUser(req.body.login, req.body.password)
    if (user) {
      const token = Token.generate(user)
      if (token) {
        res.append('Set-Cookie', `token=${token}; HttpOnly;`)
        res.send({login: user.login})
      }
    }
  })

  app.post('/login', async (req, res) => {
    const user = await Users.getUser(req.body.login, req.body.password)
    if (user) {
      const token = Token.generate(user)
      res.append('Set-Cookie', `token=${token}; HttpOnly;`)
      res.send({login: user.login})
    }
  })

  app.get('/users', authRequired, async (req, res) => {
    res.send(await Users.getAll(req.user.login))
  })

  app.get('/logout', (req, res) => {
    res.append('Set-Cookie', `token=-; HttpOnly;`)
    res.send()
  })

  app.post('/messages', authRequired, (req, res) => {
    Messages.addMessage({
      ...req.body,
    })
  })
}