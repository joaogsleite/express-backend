import { Router } from 'express'
import passport from 'setup/passport'

import { runController } from 'utils/express/middlewares'

import { onSuccess } from 'controllers/auth'

import logger from 'utils/logger'
const log = logger('routes/auth')
log('start')

const router = Router() 
log('router created')

router.post('/local',
  passport.authenticate('local'),
  runController(
    onSuccess, ['user.id']
  )
)

router.get('/oauth',
  passport.authenticate('oauth'),
  runController(
    onSuccess, ['user.id']
  )
)

log('end')

export default router
