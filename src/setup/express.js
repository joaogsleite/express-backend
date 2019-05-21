import express from 'express'
import bodyParser from 'body-parser'
//import fileUpload from 'express-fileupload'
//import morgan from 'morgan'

import passport from './passport'

import routes from 'routes'

import logger from 'utils/logger'
const log = logger('setup/express')
log('start')

const { EXPRESS_SESSION_SECRET = 'keyboard cat' } = process.env

const server = express()

//server.use(morgan('dev'))

server.use(bodyParser.json())
//server.use(bodyParser.urlencoded({ extended: false }))

//server.use(fileUpload())

server.use(passport.initialize())
server.use(passport.session())

server.use(routes)

log('end')

export default server
