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
  (req, res) => res.json(req.user)
)

router.get('/microsoft',
  passport.authenticate('microsoft'),
)
router.get('/microsoft/callback',
  passport.authenticate('microsoft'),
  (req, res) => res.redirect('/')
)

router.use(errorHandler)

log('end')

export default router
