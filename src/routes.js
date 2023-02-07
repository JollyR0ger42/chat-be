const authRequired = require('../middleware/authRequired.js')
const { User } = require('../controller')
const Token = require('../src/token.js')


module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/signup', async (req, res) => {
    const user = await User.addUser(req.body.login, req.body.password)
    if (user) {
      const token = Token.generate(user)
      if (token) {
        res.append('Set-Cookie', `token=${token}; HttpOnly;`)
        res.send()
      }
    }
  })

  app.post('/login', async (req, res) => {
    const user = await User.getUser(req.body.login, req.body.password)
    res.send(user)
  })
}