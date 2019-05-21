import { AuthError } from "utils/express/errors"

export async function onSuccess(userId) {
  return { 
    email: 'joaogsleite@gmail.com',
    name: 'Joao Leite',
  }
}

export function microsoftCallback () {

}

export async function localCallback (email, password, done) {
  const where = { email, password }
  try {
    const user = await User.find({where})
    if (user && user.email) {
      return done()
    }
  } finally {
    done(new AuthError({
      message: 'Wrong email or password',
      code: AuthError.LOGIN_INCORRECT,
    }))
  }


  if (email === 'joaogsleite@gmail.com' && password === 'password') {
    done(undefined, { email, password })
  } else {
    
  }
}
