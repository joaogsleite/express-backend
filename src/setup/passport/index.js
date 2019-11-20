// passport instance
import passport from 'passport';

// strategies
import localStrategy from './local';
import microsoftStrategy from './microsoft';

// serialize/deserialize
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(localStrategy);
passport.use(microsoftStrategy);

export default passport;
