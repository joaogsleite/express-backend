import User from 'models/user'

import { AuthError } from "utils/express/errors"


export async function microsoftCallback (accessToken, refreshToken, profile, done) {
  try {
    const where = { email: profile.emails[0] }
    const [user] = await User.findOrCreate({ where, defaults: { name: profile.displayName } })
    console.log('getUser', user)
    done(undefined, user.toJSON())
  } catch (error) {
    console.log(error)
    done(new AuthError({
      message: 'Error creating the user in the database',
      code: AuthError.OAUTH_CREATE_USER,
      error,
    }))
  }
}


export async function localCallback (email, password, done) {
  const where = { email, password }
  try {
    const user = await User.findOne({where})
    if (user && user.email) {
      return done(undefined, user.toJSON())
    } else {
      throw new Error()
    }
  } catch (error) {
    done(new AuthError({
      message: 'Wrong email or password',
      code: AuthError.LOGIN_INCORRECT,
      error,
    }))
  }
}
