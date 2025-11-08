import express from 'express';
import cors from 'cors';
import empresaRoutes from './routes/empresaRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import conductorRoutes from './routes/conductorRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/empresa', empresaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/conductor', conductorRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
