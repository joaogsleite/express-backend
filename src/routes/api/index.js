// logger
import logger from 'utils/logger'
const log = logger('routes/api')
log('start')


// express router
import { Router } from 'express'
const router = Router()
log('router created')
export default router


// routes
import './post'
import './user'

log('end')
