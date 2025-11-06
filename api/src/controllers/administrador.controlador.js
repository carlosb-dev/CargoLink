import sequelize from '../config/database.js';
import Administrador from '../models/administrador.js';

export const AdministradorController = {

  //  Crear administrador
  async crearAdministrador(req, res) {
    try {
      const { Nombre, Contrasena, Email, idEmpresa } = req.body;

      const [result] = await sequelize.query(
        "CALL sp_Administrador_insertar(@xidAdministrador, :Nombre, :Contrasena, :Email, :idEmpresa)",
        { replacements: { Nombre, Contrasena, Email, idEmpresa } }
      );

      const [[idAdministrador]] = await sequelize.query("SELECT @xidAdministrador AS idAdministrador;");

      return res.status(201).json({
        success: true,
        message: "Administrador creado correctamente",
        idAdministrador: idAdministrador.idAdministrador,
        data: result
      });
    } catch (error) {
      console.error("Error al crear administrador:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear administrador",
        error: error.message
      });
    }
  },

  //  Actualizar administrador
  async actualizarAdministrador(req, res) {
    try {
      const { idAdministrador, Nombre, Contrasena, Email } = req.body;

      await sequelize.query(
        "CALL SP_Administador_Actualizar(:idAdministrador, :Nombre, :Contrasena, :Email)",
        { replacements: { idAdministrador, Nombre, Contrasena, Email } }
      );

      return res.status(200).json({
        success: true,
        message: "Administrador actualizado correctamente"
      });
    } catch (error) {
      console.error("Error al actualizar administrador:", error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar administrador",
        error: error.message
      });
    }
  },

  //  Eliminar administrador
  async eliminarAdministrador(req, res) {
    try {
      const { idAdministrador } = req.params;

      await sequelize.query(
        "CALL sp_Administrador_Eliminar(:idAdministrador)",
        { replacements: { idAdministrador } }
      );

      return res.status(200).json({
        success: true,
        message: "Administrador eliminado correctamente"
      });
    } catch (error) {
      console.error("Error al eliminar administrador:", error);
      return res.status(500).json({
        success: false,
        message: "Error al eliminar administrador",
        error: error.message
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

      if (!result || !result[0] || result[0].idAdministrador === null) {
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

  async obtenerVehiculosDisponibles(req, res) {
    try {
      const { idEmpresa } = req.params;

      const [vehiculos] = await sequelize.query(
        "CALL Query_Vehiculos_Empresa(:idEmpresa)",
        { replacements: { idEmpresa } }
      );

      const vehiculosLibres = vehiculos.filter(v => v.Estado === 1);

      return res.json({
        success: true,
        data: vehiculosLibres
      });
    } catch (error) {
      console.error("Error al obtener vehículos disponibles:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener vehículos disponibles",
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
};
