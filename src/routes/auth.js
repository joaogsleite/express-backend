import { Router } from 'express'
import passport from 'setup/passport'

import { runController, validate } from 'utils/express/middlewares'
import { loginSchema } from 'utils/express/schemas';

import { authSuccess } from 'controllers/auth'

import logger from 'utils/logger'
const log = logger('routes/auth')
log('start')

const router = Router() 
log('router created')

router.post('/local',
  validate('body', loginSchema),
  passport.authenticate('local'),
  runController(
    authSuccess, ['user.id']
  )
)

log('end')

export default router
