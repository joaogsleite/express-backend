import passport from 'passport'

// import custom strategies
import localStrategy from './local'

// setup strategies
passport.use(localStrategy)

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
