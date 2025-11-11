import { Sequelize } from 'sequelize';
import { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } from './dotenv.js';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
});

try {
  await sequelize.authenticate();
  console.log('Conexión a MySQL establecida correctamente.');
} catch (error) {
  console.error('Error al conectar con la base de datos:', error);
}

export default sequelize;
