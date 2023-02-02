const authRequired = require('../middleware/authRequired.js')
const token = require('./token.js')
const { addUser } = require('../controller')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/', authRequired, async (req, res) => {
    console.log('----')
    // console.log('Cookies:', req.cookies)
    console.log('POST', req.body)
    await addUser(req.body.name, req.body.password)
    res.append('Set-Cookie', `token=${token.generate(req.body)}; HttpOnly;`)
    res.send()
  })
}