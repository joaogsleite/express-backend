import { Router } from 'express'

import { isAuth, validate, runController } from 'utils/express/middlewares'
import { projectSchema, idSchema } from 'utils/express/schemas'

import { createProject, getProjectById } from 'controllers/project'

import logger from 'utils/logger'
const log = logger('routes/api/project')
log('start')

const router = new Router()

router.post('/',
  isAuth(),
  validate('body', projectSchema),
  runController(
    createProject, ['user.id', 'body']
  )
)

router.get('/:id',
  isAuth(),
  validate('params.id', idSchema),
  runController(
    getProjectById, ['params.id', 'user.id']
  ),
)

log('end')

export default router
