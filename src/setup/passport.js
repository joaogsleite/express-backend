import passport from 'passport'

import { Strategy as LocalStrategy } from 'passport-local'
import { BearerStrategy as MicrosoftStrategy } from 'passport-azure-ad'

import { localCallback, microsoftCallback } from 'controllers/auth'


const localConfig = {
  usernameField: 'email',
  passwordField: 'password',
}
passport.use(new LocalStrategy(localConfig, localCallback))


const microsoftConfig = {
  identityMetadata: process.env.MICROSOFT_OAUTH_URL,
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUrl: process.env.MICROSOFT_REDIRECT_URL.includes('http')
    ? process.env.MICROSOFT_REDIRECT_URL
    : process.env.SERVER_PUBLIC_URL + process.env.MICROSOFT_REDIRECT_URL,
  allowHttpForRedirectUrl: true,
  responseType: 'code',
  responseMode: 'form_post',
}
passport.use(new MicrosoftStrategy(microsoftConfig, microsoftCallback))


passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

export default passport
