// logger
import logger from 'utils/logger';


// express router
import { Router } from 'express';

// routes
import postRouter from './post';
import userRouter from './user';


const log = logger('routes/api');
log('start');

const router = Router();
log('router created');

router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;

log('end');
