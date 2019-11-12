import { Router } from 'express'

import { getUserById } from 'controllers/user'
import { getPostsByUser } from 'controllers/post'

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
    getUserById, ['params.id', 'user.id']
  )
)

router.get('/:id/posts',
  isAuth(),
  meAlias(),
  validate('params.id', idSchema),
  runController(
    getPostsByUser, ['params.id', 'user.id']
  )
)

export default router


// add router to parent router
import parentRouter from '.'
parentRouter.use('/users', router)

log('end')
