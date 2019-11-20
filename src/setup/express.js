import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
// import fileUpload from 'express-fileupload'
// import morgan from 'morgan'


import routes from 'routes';

import logger from 'utils/logger';
import passport from './passport';

const log = logger('setup/express');
log('start');

const { SERVER_SESSION_SECRET = 'keyboard cat' } = process.env;

const server = express();

// server.use(morgan('dev'))

// cookies
server.set('trust proxy', 1);
server.use(cookieSession({
  secret: SERVER_SESSION_SECRET,
}));

server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }))

// server.use(fileUpload())

server.use(passport.initialize());
server.use(passport.session());

server.use(routes);

log('end');

export default server;
