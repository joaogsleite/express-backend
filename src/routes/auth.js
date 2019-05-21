// middlewares
import { runController, errorHandler } from 'utils/express/middlewares'

// controllers
import passport from 'setup/passport'
import { onSuccess } from 'controllers/auth'

// logger
import logger from 'utils/logger'
const log = logger('routes/auth')
log('start')

// express router
import { Router } from 'express'
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

router.use(errorHandler)

log('end')

export default router
