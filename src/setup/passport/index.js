// passport instance
import passport from 'passport'
export default passport


// serialize/deserialize
passport.serializeUser((user, cb) => {
  cb(null, user)
})
passport.deserializeUser((user, cb) => {
  cb(null, user)
})


// strategies
