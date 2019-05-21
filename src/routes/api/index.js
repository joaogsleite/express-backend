import { Router } from 'express'

// routes
import userRouter from 'routes/api/user'
import projectRouter from 'routes/api/project'

// middlewares
import { errorHandler } from 'utils/express/middlewares'

// logger
import logger from 'utils/logger'
const log = logger('routes/api')

log('start')
const router = Router()

router.use('/users', userRouter)
router.use('/projects', projectRouter)

router.use(errorHandler)

export default router
log('end')
