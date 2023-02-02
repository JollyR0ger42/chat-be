const jwt = require('jsonwebtoken')

function generate (target) {
  return jwt.sign(target, process.env.JWT_SECRET, {expiresIn: '7d'})
}

function verify (target) {
  return jwt.verify(target, process.env.JWT_SECRET)
}

module.exports = {
  generate,
  verify
}
