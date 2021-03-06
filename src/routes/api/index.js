// logger
import logger from 'utils/logger';


// express router
import { Router } from 'express';
import { notFound } from 'utils/express/middlewares';

// routes
import postRouter from './post';
import userRouter from './user';


const log = logger('routes/api');
log('start');

const router = Router();
log('router created');

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use(notFound);

export default router;

log('end');
