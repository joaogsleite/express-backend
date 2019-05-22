import passport from 'passport'

import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'

import { localCallback, microsoftCallback } from 'controllers/auth'


const localConfig = {
  usernameField: 'email',
  passwordField: 'password',
}
passport.use(new LocalStrategy(localConfig, localCallback))


const microsoftConfig = {
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: process.env.SERVER_PUBLIC_URL + '/connect/microsoft/callback',
  scope: 'user.read',
}
passport.use(new MicrosoftStrategy(microsoftConfig, microsoftCallback))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

export default passport
