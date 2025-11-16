import express from "express";
import { AdministradorController } from "../controllers/administrador.js";

const router = express.Router();

// Crear Administrador
router.post("/crear", AdministradorController.crearAdministrador);

// Login Administrador
router.post("/login", AdministradorController.loginAdministrador);

// Obtener vehículos disponibles de su empresa
router.get(
  "/vehiculos/disponibles/:idEmpresa",
  AdministradorController.obtenerVehiculosDisponibles
);

// Obtener historial de un pedido
router.get(
  "/pedido/:idPedido/historial",
  AdministradorController.obtenerHistorialPedido
);

// Crear pedido
router.post("/pedido/crear", AdministradorController.crearPedido);

// Bandeja de entrada de pedidos para la empresa del administrador
router.get(
  "/pedidos/entrada/:idEmpresa",
  AdministradorController.obtenerPedidosEntrada
);

// Actualizar estado de pedido a "recibido"
router.put(
  "/pedido/:idPedido/actualizarEstado",
  AdministradorController.actualizarEstadoPedido
);

export default router;
