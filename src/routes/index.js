// middlewares
import { errorHandler } from 'utils/express/middlewares'


// routes
import apiRouter from 'routes/api'
import authRouter from 'routes/auth'
import wwwRoute from 'routes/www'


// logger
import logger from 'utils/logger'
const log = logger('routes')
log('start')


// express router
import { Router } from 'express'
const router = Router()
export default router
log('router created')


// routes
router.use('/api', apiRouter)
router.use('/auth', authRouter)
router.use('/(api|auth)', errorHandler)
router.use(wwwRoute)

log('end')
