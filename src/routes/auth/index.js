// logger
import logger from 'utils/logger';

// express router
import { Router } from 'express';

// routes

const log = logger('routes/auth');
log('start');

const router = Router();
log('router created');

export default router;

log('end');
