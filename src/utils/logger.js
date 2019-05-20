
import Debug from 'debug'

const { 
  NAMESPACE = 'backend',
  DEBUG = 'backend:*',
} = process.env

Debug.enabled(DEBUG)

export default function (name) {
  return Debug(`${NAMESPACE}:${name}`)
}
