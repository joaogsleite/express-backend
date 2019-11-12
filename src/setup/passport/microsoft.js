
import passport from '.'

import { Strategy as MicrosoftStrategy } from 'passport-microsoft'

import callback from 'controllers/auth/microsoft'

const config = {
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: process.env.SERVER_PUBLIC_URL + '/connect/microsoft/callback',
  scope: 'user.read',
}

passport.use(new MicrosoftStrategy(config, callback))
