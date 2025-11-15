import express from "express";
import cors from "cors";
import empresaRoutes from "./routes/empresa.js";
import adminRoutes from "./routes/administrador.js";
import conductorRoutes from "./routes/conductor.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/empresa", empresaRoutes);
app.use("/api/administrador", adminRoutes);
app.use("/api/conductor", conductorRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

export default app;
