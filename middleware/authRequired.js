const token = require('../src/token.js')

module.exports = (req, res, next) => {
  const token = req.cookies?.token
  try {
    const target = token.verify(token)
    console.log('Auth:', target)
  } catch (e) {
    console.log(e)
  }
  next()
}
