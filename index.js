require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  console.log('----')
  console.log('Cookies:', req.cookies)
  console.log('POST', req.body)
  res.append('Set-Cookie', 'token=foobar; HttpOnly;')
  res.send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})