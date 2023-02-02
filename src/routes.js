const authRequired = require('../middleware/authRequired.js')
const { addUser } = require('../controller')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/', async (req, res) => {
    console.log('----')
    // console.log('Cookies:', req.cookies)
    console.log('POST', req.body)
    const token = await addUser(req.body.login, req.body.password)
    res.append('Set-Cookie', `token=${token}; HttpOnly;`)
    res.send()
  })
}