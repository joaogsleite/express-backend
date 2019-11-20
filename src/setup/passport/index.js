// passport instance
import passport from 'passport';

// strategies

// serialize/deserialize
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// strategies
export default passport;
