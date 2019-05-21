import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { local as localCallback, oauth as oauthCallback } from 'controllers/auth'


const localConfig = {
  usernameField: 'email',
  passwordField: 'password',
}
passport.use(new LocalStrategy(localConfig, localCallback))


passport.serializeUser(
  (user, cb) => {
    cb(null, user)
  }
)

passport.deserializeUser(
  (user, cb) => {
    cb(null, user)
  }
)

export default passport
