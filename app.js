const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router.js')
const {errorHandler} = require('./errorHandler.js')


const app = express()
app.use(bodyParser.urlencoded({extended:'true'}))
app.use(bodyParser.json())
app.use(cors())
app.use('/v1/api', router)
app.use(errorHandler)


module.exports = app
