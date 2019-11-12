
import passport from '.'

import { Strategy as LocalStrategy } from 'passport-local'

import callback from 'controllers/auth/local'

const config = {
  usernameField: 'email',
  passwordField: 'password',
}

passport.use(new LocalStrategy(config, callback))
