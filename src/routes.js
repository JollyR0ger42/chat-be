const authRequired = require('../middleware/authRequired.js')
const token = require('./token.js')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/', authRequired, (req, res) => {
    console.log('----')
    console.log('Cookies:', req.cookies)
    console.log('POST', req.body)
    res.append('Set-Cookie', `token=${token.generate(req.body)}; HttpOnly;`)
    res.send()
  })
}