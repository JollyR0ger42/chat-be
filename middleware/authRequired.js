const token = require('../src/token.js')

module.exports = (req, res, next) => {
  const target = req.cookies?.token
  try {
    const user = token.verify(target)
    req.user = user
  } catch (e) {
    console.log(e)
  }
  next()
}
