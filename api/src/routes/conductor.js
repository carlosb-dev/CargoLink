import express from 'express';
import { ConductorController } from '../controllers/conductor.js';

const router = express.Router();

// Login Conductor
router.post('/login', ConductorController.loginConductor);

// Obtener pedidos por vehículo
router.get('/pedidos/:idVehiculo', ConductorController.obtenerPedidosPorVehiculo);

// Actualizar estado de conductor (ocupado/disponible)
router.put('/estado/ocupado', ConductorController.actualizarEstadoConductorOpcupado);
router.put('/estado/disponible', ConductorController.actualizarEstadoConductorDisponible);

// Actualizar estado de vehículo (ocupado/disponible)
router.put('/vehiculo/ocupado', ConductorController.actualizarEstadoVehiculoOcupado);
router.put('/vehiculo/disponible', ConductorController.actualizarEstadoVehiculoDisponible);

// Actualizar estado de pedido
router.put('/pedido/estado', ConductorController.actualizarEstadoPedido);

export default router;
