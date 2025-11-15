/*Metodos de los controladores 
    Crear Empresa
    Login Empresa
    Obtener Conductores de la empresa
    Obtener Vehiculos de la empresa
    Crear Conductor
    Crear Vehiculo
    Crear Vinculo Conductor Vehiculo
    Obtener Pedido donde la empresa sea la receptora (idempresa)
    Obtener historial de un pedido en especifico (idpedido)
*/

import sequelize from '../config/database.js';
import Empresa from '../models/empresa.js';

export const EmpresaController = {

    async crearEmpresa(req, res) {
    try {
      const { Nombre, Contrasena, Direccion, Email } = req.body;

      const result = await sequelize.query(
        "CALL sp_Empresa_insertar(@xidEmpresa, :Nombre, :Contrasena, :Direccion, :Email)",
        { replacements: { Nombre, Contrasena, Direccion, Email } }
      );

      return res.status(201).json({
        success: true,
        message: "Empresa creada correctamente",
        data: result
      });
    } catch (error) {
      console.error("Error al crear empresa:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear empresa",
        error: error.message
      });
    }
  },

  async loginEmpresa(req, res) {
    try {
      const { Email, Contrasena } = req.body;

      const [result] = await sequelize.query(
        "CALL sp_LoginEmpresa(:Email, :Contrasena)",
        { replacements: { Email, Contrasena } }
      );

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result[0]
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({
        success: false,
        message: "Error al iniciar sesión",
        error: error.message
      });
    }
  },

  async obtenerConductoresEmpresa(req, res) {
    try {
      const { idEmpresa } = req.params;

      const [conductores] = await sequelize.query(
        "CALL Query_Conductores_Empresa(:idEmpresa)",
        { replacements: { idEmpresa } }
      );

      return res.status(200).json(conductores);

    } catch (error) {
      console.error("Error al obtener conductores:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener conductores",
        error: error.message
      });
    }
  },

  async obtenerVehiculosEmpresa(req, res) {
    try {
      const { idEmpresa } = req.params;

      const [vehiculos] = await sequelize.query(
        "CALL Query_Vehiculos_Empresa(:idEmpresa)", 
        { replacements: { idEmpresa } }
      );

      return res.status(200).json(vehiculos);

    } catch (error) {
      console.error("Error al obtener vehiculos:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener vehículos",
        error: error.message
      });
    }
  },

  async crearConductor(req, res) {
    try {
      const { Nombre, Licencia, Email, idEmpresa } = req.body;

      await sequelize.query(
        "CALL sp_Conductor_insertar(@xidConductor, :Nombre, :Licencia, :Email, :idEmpresa)",
        { replacements: { Nombre, Licencia, Email, idEmpresa } }
      );

      const [[{ idConductor }]] = await sequelize.query(
        "SELECT @xidConductor AS idConductor"
      );

      return res.status(201).json({
        success: true,
        message: "Conductor creado correctamente",
        conductor: { idConductor }
      });

    } catch (error) {
      console.error("Error al crear conductor:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear conductor",
        error: error.message
      });
    }
  },


  async crearVehiculo(req, res) {
    try {
      const { Modelo, Tipo, Matricula, Capacidad, Cantidad_paquetes, Estado, idEmpresa } = req.body;

      await sequelize.query(
        "CALL sp_Vehiculo_insertar(@xidVehiculo, :Modelo, :Tipo, :Matricula, :Capacidad, :Cantidad_paquetes, :idEmpresa)",
        { replacements: { Modelo, Tipo, Matricula, Capacidad, Cantidad_paquetes, idEmpresa } }
      );

      const [[{ idVehiculo }]] = await sequelize.query(
        "SELECT @xidVehiculo AS idVehiculo"
      );

      return res.status(201).json({
        success: true,
        message: "Vehículo creado correctamente",
        vehiculo: { idVehiculo }
      });

    } catch (error) {
      console.error("Error al crear vehículo:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear vehículo",
        error: error.message
      });
    }
  },

  async vincularVehiculoConductor(req, res) {
    try {
      const { idVehiculo, idConductor } = req.body;

      await sequelize.query(
        "CALL sp_Vehiculo_Conductor_insertar(:idVehiculo, :idConductor)",
        { replacements: { idVehiculo, idConductor } }
      );

      return res.status(200).json({
        success: true,
        message: "Vehículo y conductor vinculados correctamente"
      });

    } catch (error) {
      console.error("Error al vincular:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear vinculación",
        error: error.message
      });
    }
  },


  async obtenerPedidos(req, res) {
    try {
      const { idEmpresa } = req.params;

      const [pedidos] = await sequelize.query(
        "CALL Query_Paquetes_Enviados_Empresa(:idEmpresa)", 
        { replacements: { idEmpresa } }
      );

      return res.json(pedidos);

    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener pedidos",
        error: error.message
      });
    }
  },

  async obtenerHistorialPedido(req, res) {
    try {
      const { idPedido } = req.params;

      const [historial] = await sequelize.query(
        "CALL Query_Historial_Pedido(:idPedido)", 
        { replacements: { idPedido } }
      );

      return res.json(historial);
    } catch (error) {
      console.error("Error al obtener historial del pedido:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener historial del pedido",
        error: error.message
      });
    }
  },
};
