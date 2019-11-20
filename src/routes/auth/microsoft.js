// controllers
import passport from 'setup/passport';

// logger
import logger from 'utils/logger';

// express router
import { Router } from 'express';

const log = logger('routes/auth/microsoft');
log('start');

const router = Router();
log('router created');

router.get('/',
  passport.authenticate('microsoft'));

router.get('/callback',
  passport.authenticate('microsoft'),
  (req, res) => res.redirect('/'));

export default router;

log('end');
