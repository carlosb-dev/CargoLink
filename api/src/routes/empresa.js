import express from 'express';
import { EmpresaController } from '../controllers/empresa.controlador.js';

const router = express.Router();

// Crear Empresa
router.post('/crear', EmpresaController.crearEmpresa);

// Login Empresa
router.post('/login', EmpresaController.loginEmpresa);

// Obtener Conductores de la empresa
router.get('/:idEmpresa/conductores', EmpresaController.obtenerConductoresEmpresa);

// Obtener Vehículos de la empresa
router.get('/:idEmpresa/vehiculos', EmpresaController.obtenerVehiculosEmpresa);

// Crear Conductor
router.post('/conductor/crear', EmpresaController.crearConductor);

// Crear Vehículo
router.post('/vehiculo/crear', EmpresaController.crearVehiculo);

// Vincular Vehículo con Conductor
router.post('/vincular', EmpresaController.vincularVehiculoConductor);

// Obtener Pedidos donde la empresa sea receptora
router.get('/:idEmpresa/pedidos', EmpresaController.obtenerPedidos);

// Obtener historial de un pedido específico
router.get('/pedido/:idPedido/historial', EmpresaController.obtenerHistorialPedido);

// Obtener todas las empresas
router.get('/', EmpresaController.obtenerEmpresas);

export default router;
