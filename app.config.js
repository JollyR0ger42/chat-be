const cookieParser = require('cookie-parser')
const cors = require('./middleware/cors.js')
const routes = require('./src/routes.js')

module.exports = (app) => {
  app.use(cors)
  app.use(cookieParser())
  routes(app)
}