const token = require('../src/token.js')

module.exports = (req, res, next) => {
  const target = req.cookies?.token
  let user

  try { user = token.verify(target) }
  catch (e) {
    console.log(e)
    next()
  }

  const createdAt = user.iat * 1000 // token has it in seconds
  let timePass = new Date() - createdAt
  timePass = timePass / 1000 / 60 / 60 // in hours
  if (timePass >= 24) {
    const newToken = token.generate({ login: user.login })
    res.append('Set-Cookie', `token=${newToken}; HttpOnly;`)
    res.send()
    console.log('old', target)
    console.log('new', newToken)
  }

  req.user = user
  next()
}
