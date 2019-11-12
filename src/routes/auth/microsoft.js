// controllers
import passport from 'setup/passport'


// logger
import logger from 'utils/logger'
const log = logger('routes/auth/microsoft')
log('start')


// express router
import { Router } from 'express'
const router = Router() 
log('router created')

router.get('/',
  passport.authenticate('microsoft'),
)
router.get('/callback',
  passport.authenticate('microsoft'),
  (req, res) => res.redirect('/')
)

export default router


// add router to parent router
import parentRouter from '.'
parentRouter.use('/microsoft', router)

log('end')