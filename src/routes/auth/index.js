// logger
import logger from 'utils/logger';

// express router
import { Router } from 'express';

// routes
import localRouter from './local';
import microsoftRouter from './microsoft';

const log = logger('routes/auth');
log('start');

const router = Router();
log('router created');

router.use('/local', localRouter);
router.use('/microsoft', microsoftRouter);

export default router;

log('end');
