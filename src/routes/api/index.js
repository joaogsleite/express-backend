import { Router } from 'express'

// routes
import userRouter from 'routes/api/user'
import postRouter from 'routes/api/post'

// middlewares
import { errorHandler } from 'utils/express/middlewares'

// logger
import logger from 'utils/logger'
const log = logger('routes/api')

log('start')
const router = Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)

router.use(errorHandler)

export default router
log('end')
