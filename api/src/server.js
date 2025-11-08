import app from './app.js';
import sequelize from './config/database.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión con la base de datos establecida correctamente.');

    app.listen(PORT, () => {
      console.log(`servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();
