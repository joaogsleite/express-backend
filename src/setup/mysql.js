import Sequelize from 'sequelize';

import logger from 'utils/logger';

const log = logger('config/database');

const {
  DB_NAME,
  DB_USER = 'root',
  DB_PASS,
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_DIALECT = 'mysql',
  DB_LOG = false,
  DB_CLEAN = false,
  DB_SSL = false,
} = process.env;

log('start');
log('DB_NAME', DB_NAME);
log('DB_USER', DB_USER);
log('DB_PASS', DB_PASS);
log('DB_HOST', DB_HOST);
log('DB_DIALECT', DB_DIALECT);
log('DB_LOG', DB_LOG);
log('DB_CLEAN', DB_CLEAN);

const options = {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: DB_LOG === 'true',
  ssl: DB_SSL === 'true',
  dialectOptions: DB_SSL === 'true' ? {
    ssl: {
      rejectUnauthorized: false,
    },
  } : {},
};

const database = new Sequelize(
  DB_NAME || '',
  DB_USER || '',
  DB_PASS || '',
  options,
);

export default database;

database.sync({ force: DB_CLEAN === 'true' }).then(() => {
  log('synced');
  require('models');
});

log('end');
