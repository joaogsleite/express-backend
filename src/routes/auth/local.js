// controllers
import passport from 'setup/passport'


// logger
import logger from 'utils/logger'
const log = logger('routes/auth/local')
log('start')


// express router
import { Router } from 'express'
const router = Router() 
log('router created')

router.post('/',
  passport.authenticate('local'),
  (req, res) => res.json(req.user)
)

export default router


// add router to parent router
import parentRouter from '.'
parentRouter.use('/local', router)

log('end')
