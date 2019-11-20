import { Strategy as MicrosoftStrategy } from 'passport-microsoft';

import callback from 'controllers/auth/microsoft';

const config = {
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_PUBLIC_URL}/connect/microsoft/callback`,
  scope: 'user.read',
};

export default new MicrosoftStrategy(config, callback);
