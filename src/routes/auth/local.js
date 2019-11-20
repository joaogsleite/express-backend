// controllers
import passport from 'setup/passport';

// logger
import logger from 'utils/logger';

// express router
import { Router } from 'express';

const log = logger('routes/auth/local');
log('start');

const router = Router();
log('router created');

router.post('/',
  passport.authenticate('local'),
  (req, res) => res.json(req.user));

export default router;

log('end');
