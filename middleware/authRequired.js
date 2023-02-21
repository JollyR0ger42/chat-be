const token = require('../src/token.js')
const { Users } = require('../controller')

module.exports = async (req, res, next) => {
  const target = req.cookies?.token
  let user, iat

  try {
    user = token.verify(target)
    iat = user.iat
    user = await Users().getUser(user.login)
  }
  catch (e) {
    console.log(e)
    const err = new Error('Unauthorized')
    err.status = 401
    return next(err)
  }

  const createdAt = iat * 1000 // token has it in seconds
  let timePass = new Date() - createdAt
  timePass = timePass / 1000 / 60 / 60 // in hours
  if (timePass >= 24) {
    const newToken = token.generate({ login: user.login })
    res.append('Set-Cookie', `token=${newToken}; HttpOnly;`)
  }

  req.user = { ...user, password: '' }
  return next()
}
