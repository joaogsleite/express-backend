import { Router } from 'express'

// routes
import userRouter from 'routes/api/user'
import projectRouter from 'routes/api/project'

// logger
import logger from 'utils/logger'
const log = logger('routes/api')

log('start')
const router = Router()

router.use('/users', userRouter)
router.use('/projects', projectRouter)

router.use((error, req, res, next) => {
  delete error.isHttpError
  log(`${error.type}: statusCode=${error.statusCode} ${error.message ? 'msg='+error.message : ''}`)
  res.status(error.statusCode).json(error)
})

export default router
log('end')
