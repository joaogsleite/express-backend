import { User, Role } from 'models'

import { AuthError } from "utils/express/errors"

const include = [
  { model: Role, as: 'roles' },
]

export default async function callback (email, password, done) {
  const where = { email, password }
  try {
    const user = await User.findOne({ where, include })
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
