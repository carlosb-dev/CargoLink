/*Conductor debera incluir los metodos para:
    loguearse
    obtener vehiculos por vehiculo
    Acualizar estado de conductor
    Actualizar estado de vehiculo
    Actuailizar estado de pedidos
*/

import sequelize from "../config/database.js";

export const ConductorController = {
  async loginConductor(req, res) {
    try {
      const { Email, Licencia } = req.body;

      const result = await sequelize.query(
        "CALL sp_LoginConductor(:Licencia, :Email)",
        { replacements: { Licencia, Email } }
      );

      if (!result || result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Credenciales incorrectas o conductor no encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result[0],
      });
    } catch (error) {
      console.error("Error en login de conductor:", error);
      return res.status(500).json({
        success: false,
        message: "Error al iniciar sesión",
        error: error.message,
      });
    }
  },

  async obtenerPedidosPorVehiculo(req, res) {
    try {
      const { idVehiculo } = req.params;

      const pedidos = await sequelize.query(
        "CALL Query_Pedidos_Por_Vehiculo(:idVehiculo)",
        { replacements: { idVehiculo } }
      );

      return res.status(200).json({
        success: true,
        message: "Pedidos obtenidos correctamente",
        data: Array.isArray(pedidos) ? pedidos : [],
      });
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener pedidos del vehículo",
        error: error.message,
      });
    }
  },

  async actualizarEstadoConductorOpcupado(req, res) {
    try {
      const { idConductor, Estado } = req.body;

      const resultado = await sequelize.query(
        "CALL sp_Conductor_actualizar_estado_ocupado(:idConductor, :Estado)",
        { replacements: { idConductor, Estado } }
      );

      return res.json({
        success: true,
        message: "Estado del conductor actualizado correctamente",
        data: resultado ?? null,
      });
    } catch (error) {
      console.error("Error al actualizar estado del conductor:", error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar estado del conductor",
        error: error.message,
      });
    }
  },

  async actualizarEstadoConductorDisponible(req, res) {
    try {
      const { idConductor, Estado } = req.body;

      const resultado = await sequelize.query(
        "CALL sp_Conductor_actualizar_estado_Liberar(:idConductor, :Estado)",
        { replacements: { idConductor, Estado } }
      );

      return res.json({
        success: true,
        message: "Estado del conductor actualizado correctamente",
        data: resultado,
      });
    } catch (error) {
      console.error("Error al actualizar estado del conductor:", error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar estado del conductor",
        error: error.message,
      });
    }
  },

  async actualizarEstadoVehiculoOcupado(req, res) {
    try {
      const { idVehiculo, Estado } = req.body;

      const resultado = await sequelize.query(
        "CALL sp_Vehiculo_actualizar_estado_ocupado(:idVehiculo, :Estado)",
        { replacements: { idVehiculo, Estado } }
      );

      return res.json({
        success: true,
        message: "Estado del vehículo actualizado correctamente",
        data: resultado,
      });
    } catch (error) {
      console.error("Error al actualizar estado del vehículo:", error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar estado del vehículo",
        error: error.message,
      });
    }
  },

  async actualizarEstadoVehiculoDisponible(req, res) {
    try {
      const { idVehiculo, Estado } = req.body;

      const resultado = await sequelize.query(
        "CALL sp_Vehiculo_actualizar_estado_Disponible(:idVehiculo, :Estado)",
        { replacements: { idVehiculo, Estado } }
      );

      return res.json({
        success: true,
        message: "Estado del vehículo actualizado correctamente",
        data: resultado,
      });
    } catch (error) {
      console.error("Error al actualizar estado del vehículo:", error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar estado del vehículo",
        error: error.message,
      });
    }
  },

  async actualizarEstadoPedido(req, res) {
    try {
      const { idPedido, Estado } = req.body;

      const resultado = await sequelize.query(
        "CALL sp_Pedido_actualizar_estado(:idPedido, :Estado)",
        { replacements: { idPedido, Estado } }
      );

      return res.json({
        success: true,
        message: "Estado del pedido actualizado correctamente",
        data: resultado,
      });
    } catch (error) {
      console.error("Error al actualizar estado del pedido:", error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar estado del pedido",
        error: error.message,
      });
    }
  },
};
