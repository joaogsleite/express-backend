import { Router } from 'express'

import { isAuth, validate, runController } from 'utils/express/middlewares'
import { postSchema, idSchema } from 'utils/express/schemas'

import { createPost, getPostById } from 'controllers/post'

import logger from 'utils/logger'
const log = logger('routes/api/post')
log('start')

const router = new Router()

router.post('/',
  isAuth(),
  validate('body', postSchema),
  runController(
    createPost, ['user.id', 'body']
  )
)

router.get('/:id',
  isAuth(),
  validate('params.id', idSchema),
  runController(
    getPostById, ['params.id', 'user.id']
  ),
)

log('end')

export default router
