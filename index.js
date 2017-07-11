import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from './router'
import mongoose from 'mongoose'

// Database
mongoose.connect('mongodb://localhost/positive')

// App
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on', port)
