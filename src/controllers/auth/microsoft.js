import { User, Role } from 'models'

import { AuthError } from "utils/express/errors"

const include = [
  { model: Role, as: 'roles' },
]

export default async function callback (accessToken, refreshToken, profile, done) {
  try {
    const where = { email: profile.emails[0].value }
    const defaults = { name: profile.displayName }
    const [user] = await User.findOrCreate({ where, defaults, include })
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
