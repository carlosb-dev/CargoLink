import dotenv from 'dotenv';

dotenv.config({ path: './api/.env' });

console.log('Variables cargadas:', process.env.DB_HOST, process.env.DB_USER);

export const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASS = 'root',
  DB_NAME = 'cargolink',
  DB_PORT = 3306,
  PORT = 3000,
} = process.env;
