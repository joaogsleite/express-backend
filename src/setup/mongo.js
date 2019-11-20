
import mongoose from 'mongoose';

const {
  DB_NAME,
  DB_USER = 'root',
  DB_PASS,
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
} = process.env;

const configs = { useNewUrlParser: true };
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.connect(url, configs);

export default mongoose;
