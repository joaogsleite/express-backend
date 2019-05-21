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
  const statusCode = error.statusCode
  delete error.isHttpError
  delete error.statusCode
  log(error.toString())
  if (process.env.NODE_ENV !== 'development') {
    error.details = error.details.filter((detail) => {
      return detail.code !== -1 && detail.type !== 'RawError'
    })
  } 
  res.status(statusCode).json(error)
})

export default router
log('end')
