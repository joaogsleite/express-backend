import { User } from 'models'
import bcrypt from 'bcryptjs'
import createError from 'http-errors'
import { Strategy } from 'passport-local'

import logger from 'utils/logger'
const log = logger('setup/passport/local')

const config = {
  usernameField: 'username',
  passwordField: 'password',
}

const callback = (username, password, done) => {
  if (!User) {
    done(createError(500, 'No database connection'))
  } else {
    const where = { username }
    User.find({ where, include }).then((user) => {
      log(bcrypt.hashSync('password', 5))
      if (!user) {
        return done(createError(404, 'User not found'))
      }
      else if (bcrypt.compareSync(password, user.password || '')) {
        const user = {
          username: user.username,
          name: user.name,
          id: user.id,
        }
        return done(null, user)
      } else {
        return done(createError(403, 'Wrong password'))
      }
    }).catch(done)
  }
}

const strategy = new Strategy(config, callback)
export default strategy
