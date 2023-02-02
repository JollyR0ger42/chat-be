require('dotenv').config()
const express = require('express')
const appConfig = require('./app.config.js')

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
appConfig(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})