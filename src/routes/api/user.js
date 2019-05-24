import { Router } from 'express'

import { getUser } from 'controllers/user'
import { getProjectsByUser } from 'controllers/project'

import { meAlias, isAuth, validate, runController } from 'utils/express/middlewares'
import { idSchema } from 'utils/express/schemas'

import logger from 'utils/logger'
const log = logger('routes/api/user')
log('start')

const router = new Router()

router.get('/:id',
  isAuth(),
  meAlias(),
  validate('params.id', idSchema),
  runController(
    getUser, ['params.id', 'user.id']
  )
)

router.get('/:id/projects',
  isAuth(),
  meAlias(),
  validate('params.id', idSchema),
  runController(
    getProjectsByUser, ['params.id', 'user.id']
  )
)

log('end')

export default router
