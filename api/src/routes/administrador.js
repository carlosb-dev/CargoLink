import express from 'express';
import { AdministradorController } from '../controllers/administrador.controlador.js';

const router = express.Router();

// Crear Administrador
router.post('/crear', AdministradorController.crearAdministrador);

// Actualizar Administrador
router.put('/actualizar', AdministradorController.actualizarAdministrador);

// Eliminar Administrador
router.delete('/:idAdministrador', AdministradorController.eliminarAdministrador);

// Login Administrador
router.post('/login', AdministradorController.loginAdministrador);

// Obtener vehículos disponibles de su empresa
router.get('/vehiculos/disponibles/:idEmpresa', AdministradorController.obtenerVehiculosDisponibles);

// Obtener historial de un pedido
router.get('/pedido/:idPedido/historial', AdministradorController.obtenerHistorialPedido);

// Crear pedido
router.post('/pedido/crear', AdministradorController.crearPedido);

export default router;
