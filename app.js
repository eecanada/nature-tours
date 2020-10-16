const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
  
const app = express()

// MIDDLEWARE
//middleware, modify incoming request data, let's me access req.body
app.use(morgan('dev'))
app.use(express.json())

// ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app


 