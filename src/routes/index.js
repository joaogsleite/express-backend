// middlewares
import { errorHandler } from 'utils/express/middlewares';

// routes
import apiRouter from 'routes/api';
import authRouter from 'routes/auth';
import wwwRoute from 'routes/www';

// logger
import logger from 'utils/logger';

// express router
import { Router } from 'express';

const log = logger('routes');
log('start');

const router = Router();
log('router created');

export default router;

// routes
router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use(['/api', '/auth'], errorHandler);
router.use(wwwRoute);

log('end');
