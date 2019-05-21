import { Router } from 'express'

// routes
import apiRouter from 'routes/api'
import authRouter from 'routes/auth'
import wwwRoute from 'routes/www'

// logger
import logger from 'utils/logger'
const log = logger('routes/www')

log('start')
const router = Router()

router.use('/api', apiRouter)
router.use('/auth', authRouter)
router.use(wwwRoute)

export default router
log('end')
