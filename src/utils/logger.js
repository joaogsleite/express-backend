
import Debug from 'debug';

const {
  NAMESPACE = 'backend',
  DEBUG = 'backend:*',
} = process.env;

Debug.enable(DEBUG);

export default function (name) {
  return Debug(`${NAMESPACE}:${name}`);
}
