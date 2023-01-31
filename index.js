require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const dbConnect = require('./db/mongodb.js')

dbConnect().then(client => {
  const adminDb = client.db().admin()
  adminDb.listDatabases(function(err, result) {
    console.log(result.databases)
  })
}).catch(console.error)

const port = process.env.PORT || 3000
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
}

const app = express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

function generateToken (target) {
  return jwt.sign(target, process.env.JWT_SECRET, {expiresIn: '1800s'})
}

function authRequired (req, res, next) {
  const token = req.cookies?.token
  const target = jwt.verify(token, process.env.JWT_SECRET)
  console.log('authRequired', target)
  next()
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', authRequired, (req, res) => {
  console.log('----')
  console.log('Cookies:', req.cookies)
  console.log('POST', req.body)
  res.append('Set-Cookie', `token=${generateToken(req.body)}; HttpOnly;`)
  res.send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})