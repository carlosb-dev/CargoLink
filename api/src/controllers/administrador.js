import sequelize from "../config/database.js";
import Administrador from "../models/administrador.js";

export const AdministradorController = {
  async crearAdministrador(req, res) {
    try {
      const { Nombre, Contrasena, Email, idEmpresa } = req.body;

      await sequelize.query(
        "CALL sp_Administrador_insertar(@xidAdministrador, :Nombre, :Contrasena, :Email, :idEmpresa)",
        { replacements: { Nombre, Contrasena, Email, idEmpresa } }
      );

      const [row] = await sequelize.query(
        "SELECT @xidAdministrador AS idAdministrador;"
      );

      return res.status(201).json({
        success: true,
        message: "Administrador creado correctamente",
        administrador: {
          idAdministrador: row.idAdministrador,
          Nombre,
          Email,
          idEmpresa,
        },
      });
    } catch (error) {
      console.error("Error al crear administrador:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear administrador",
        error: error.message,
      });
    }
  },

  //  Iniciar sesión
  async loginAdministrador(req, res) {
    try {
      const { Email, Contrasena } = req.body;

      const [result] = await sequelize.query(
        "CALL sp_LoginAdministrador(:Email, :Contrasena)",
        { replacements: { Email, Contrasena } }
      );

      return res.json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result[0],
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({
        success: false,
        message: "Error al iniciar sesión",
        error: error.message,
      });
    }
  },

  async obtenerVehiculosDisponibles(req, res) {
    try {
      const { idEmpresa } = req.params;

      const vehiculos = await sequelize.query(
        "CALL Query_Vehiculos_Conductores_Libres_Empresa(:idEmpresa)",
        { replacements: { idEmpresa } }
      );

      const vehiculosArray = Array.isArray(vehiculos) ? vehiculos : [];
      const vehiculosLibres = vehiculosArray.filter((v) => v.Estado === 1);

      return res.status(200).json({
        success: true,
        data: vehiculosLibres,
      });
    } catch (error) {
      console.error("Error al obtener vehículos disponibles:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener vehículos disponibles",
        error: error.message,
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
        data: historial,
      });
    } catch (error) {
      console.error("Error al obtener historial del pedido:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener historial del pedido",
        error: error.message,
      });
    }
  },

  async crearPedido(req, res) {
    try {
      const {
        Nombre,
        Peso,
        Volumen,
        Estado,
        Origen,
        Destino,
        idVehiculo,
        idAdministrador,
        idEmpresa,
      } = req.body;

      const resultado = await sequelize.query(
        "CALL sp_Pedido_insertar(@idPedido, :Nombre, :Peso, :Volumen, :Estado, :Origen, :Destino, :idVehiculo, :idAdministrador, :idEmpresa)",
        {
          replacements: {
            Nombre,
            Peso,
            Volumen,
            Estado,
            Origen,
            Destino,
            idVehiculo,
            idAdministrador,
            idEmpresa,
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: "Pedido creado correctamente.",
        data: resultado,
      });
    } catch (error) {
      console.error("Error al crear pedido:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear el pedido.",
        error: error.message,
      });
    }
  },

  async obtenerPedidosEntrada(req, res) {
    try {
      const { idEmpresa } = req.params;
      const [pedidos] = await sequelize.query(
        "CALL Query_Pedidos_Empresa(:idEmpresa)",
        { replacements: { idEmpresa } }
      );
      return res.json({
        success: true,
        data: pedidos,
      });
    } catch (error) {
      console.error("Error al obtener pedidos de entrada:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener pedidos de entrada",
        error: error.message,
      });
    }
  },

  async actualizarEstadoPedido(req, res) {
    try {
      const { idPedido } = req.params;
      const { Estado } = req.body;
      await sequelize.query(
        "CALL sp_Pedido_actualizar_estado(:idPedido, :Estado)",
        { replacements: { idPedido, Estado } }
      );
      return res.json({
        success: true,
        message: "Estado del pedido actualizado correctamente",
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
