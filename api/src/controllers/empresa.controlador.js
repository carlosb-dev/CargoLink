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

      const [result] = await sequelize.query(
        "CALL sp_Empresa_insertar(:Nombre, :Contrasena, :Direccion, :Email)", 
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

      if (!result || !result[0] || result[0].idEmpresa === null) {
        return res.status(401).json({
          success: false,
          message: "Credenciales incorrectas"
        });
      }

      return res.json({
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

      return res.json({
        success: true,
        data: conductores
      });
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

      return res.json({
        success: true,
        data: vehiculos
      });
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
      const { Nombre, Email, Contrasena, idEmpresa } = req.body;

      const [resultado] = await sequelize.query(
        "CALL sp_Conductor_insertar(:Nombre, :Email, :Contrasena, :idEmpresa)",
        { replacements: { Nombre, Email, Contrasena, idEmpresa } }
      );

      return res.status(201).json({
        success: true,
        message: "Conductor creado correctamente",
        data: resultado
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
      const { Patente, Modelo, Marca, idEmpresa } = req.body;

      const [resultado] = await sequelize.query(
        "CALL sp_Vehiculo_insertar(:Patente, :Modelo, :Marca, :idEmpresa)",
        { replacements: { Patente, Modelo, Marca, idEmpresa } }
      );

      return res.status(201).json({
        success: true,
        message: "Vehículo creado correctamente",
        data: resultado
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

      const [resultado] = await sequelize.query(
        "CALL sp_Vehiculo_Conductor_insertar(:idVehiculo, :idConductor)", 
        { replacements: { idVehiculo, idConductor } }
      );

      return res.status(200).json({
        success: true,
        message: "Vinculación creada correctamente",
        data: resultado
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

      return res.json({
        success: true,
        data: pedidos
      });
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

      return res.json({
        success: true,
        data: historial
      });
    } catch (error) {
      console.error("Error al obtener historial del pedido:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener historial del pedido",
        error: error.message
      });
    }
  },

  async obtenerEmpresas(req, res) {
    try {
      const [empresas] = await sequelize.query(
        "CALL sp_ObtenerEmpresas()"
      );

      return res.json({
        success: true,
        data: empresas
      });
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener empresas",
        error: error.message
      });
    }
  }
};
