import dotenv from 'dotenv';
dotenv.config({ path: './api/.env' });
console.log('🔎 Variables cargadas:', process.env.DB_HOST, process.env.DB_USER);


export const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
  PORT
} = process.env;
