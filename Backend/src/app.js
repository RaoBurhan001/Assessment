const express = require('express')
const connectDb = require('./config/dbConfig')
const cors = require('cors')
const passport = require('passport')
const routes = require('./routes')

const app = express()
// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))
// enable cors
app.use(cors())
app.options('*', cors())

/** using routes */
// Connect ot the database
connectDb()
app.use('/api', routes)
// jwt authentication
app.use(passport.initialize())

module.exports = app
