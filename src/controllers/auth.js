import { AuthError } from "utils/express/errors";

export async function onSuccess(userId) {
  return { 
    email: 'joaogsleite@gmail.com',
    name: 'Joao Leite',
  }
}

export function oauth () {

}

export function local (email, password, done) {
  if (email === 'joaogsleite@gmail.com' && password === 'password') {
    done(undefined, { email, password })
  } else {
    done (new AuthError())
  }
}
