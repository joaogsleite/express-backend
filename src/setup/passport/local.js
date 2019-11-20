import { Strategy as LocalStrategy } from 'passport-local';

import callback from 'controllers/auth/local';

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

export default new LocalStrategy(config, callback);
