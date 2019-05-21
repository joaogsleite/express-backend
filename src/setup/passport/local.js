import { Strategy } from 'passport-local'

import logger from 'utils/logger'
const log = logger('setup/passport/local')

const config = {
  usernameField: 'email',
  passwordField: 'password',
}

const callback = (email, password, done) => {
  done(null, { email })
}

const strategy = new Strategy(config, callback)
export default strategy
