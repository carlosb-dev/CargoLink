/*Consultas que figuran en los Views de la Entidad Empresa*/

/*--------------------------------------------------------*/
-- Consulta que trae todos los administradores de la empresa (por idEmpresa)
/*--------------------------------------------------------*/

DELIMITER $$
DROP Procedure if Exists Query_Administradores_Empresa $$
CREATE PROCEDURE Query_Administradores_Empresa (IN xidEmpresa INT)
BEGIN

    SELECT idAdministrador, Nombre, Contrasena, Email, idEmpresa
    FROM Administrador
    Where idEmpresa = xidEmpresa;

END $$
DELIMITER $$;

DELIMITER $$
DROP Procedure if Exists Query_Administradores_NombreEmpresa $$
CREATE PROCEDURE Query_Administradores_NombreEmpresa (IN xEmpresa Varchar(45), IN xEmail Varchar(100))
BEGIN

    SELECT idAdministrador, Nombre, Contrasena, Email, idEmpresa
    FROM Administrador
    Where Empresa = xEmpresa OR Email = xEmail;

END $$
DELIMITER $$;

/*--------------------------------------------------------*/
-- Cosulta que trae todos los CONDUCTORE de la empresa (por idEmpresa)
/*--------------------------------------------------------*/

DELIMITER $$
DROP Procedure if Exists Query_Conductores_Empresa $$
CREATE PROCEDURE Query_Conductores_Empresa (IN xidEmpresa INT)
BEGIN

    SELECT idConductor, Nombre, Licencia, Estado, idEmpresa, Email
    FROM Conductor
    Where idEmpresa = xidEmpresa;

END $$

DELIMITER $$
DROP Procedure if Exists Query_Conductores_Email $$
CREATE PROCEDURE Query_Conductores_Email (IN xEmail Varchar(100))
BEGIN

    SELECT idConductor, Nombre, Licencia, Estado, idEmpresa, Email
    FROM Conductor
    Where Email = xEmail;

END $$

/*--------------------------------------------------------*/
-- Consulta que trae todos los VEHICULOS de la empresa (por idEmpresa)
/*--------------------------------------------------------*/

DELIMITER $$
DROP Procedure if Exists Query_Vehiculos_Empresa $$
CREATE PROCEDURE Query_Vehiculos_Empresa (IN xidEmpresa INT)
BEGIN

    SELECT idVehiculo, Modelo, Tipo, Matricula, Capacidad, Cantidad_Paquetes, Estado, idEmpresa
    FROM Vehiculo
    Where idEmpresa = xidEmpresa;

END $$

/*--------------------------------------------------------*/
-- Consulta que trae a los vehiculos y sus conductores asignados (por idEmpresa)
/*--------------------------------------------------------*/

DELIMITER $$
DROP Procedure if Exists Query_Vehiculos_Conductores_Empresa $$
CREATE PROCEDURE Query_Vehiculos_Conductores_Empresa (IN xidEmpresa INT)
BEGIN

    SELECT idVehiculo, Modelo, Tipo, Matricula, Capacidad, Cantidad_Paquetes, Estado, idEmpresa, idConductor, Nombre, Licencia, Estado, idEmpresa, Fecha_Asignacion
    FROM vehiculo_has_conductor
    JOIN Vehiculo ON vehiculo_has_conductor.Vehiculo_idVehiculo = Vehiculo.idVehiculo
    JOIN Conductor ON vehiculo_has_conductor.Conductor_idConductor = Conductor.idConductor
    Where Vehiculo.idEmpresa = xidEmpresa;

END $$

/*--------------------------------------------------------*/
-- Cosulta que trae los paquetes de la empresa que envia (por idEmpresa)
/*--------------------------------------------------------*/

DELIMITER $$
DROP PROCEDURE IF EXISTS Query_Paquetes_Enviados_Empresa $$
CREATE PROCEDURE Query_Paquetes_Enviados_Empresa (IN xidEmpresa INT)
BEGIN

    SELECT pe.idPedido AS IdPedido, pe.Nombre AS NombrePedido, pe.Volumen, pe.Peso, pe.Estado AS Estado, pe.Origen, pe.Destino
    FROM Pedido pe
    WHERE pe.idEmpresa = xidEmpresa;

END $$

/*--------------------------------------------------------*/
-- Consulta que tree el historial del pedido seleccionado  (por idPedido)
/*--------------------------------------------------------*/

DELIMITER $$
DROP PROCEDURE IF EXISTS Query_Historial_Pedido $$
CREATE PROCEDURE Query_Historial_Pedido (IN xidPedido INT)
BEGIN
    SELECT 
        p.Nombre AS NombrePedido,
        p.Peso,
        p.Volumen,
        p.Estado AS EstadoPedido,
        p.Origen,
        p.Destino,
        v.Modelo AS VehiculoModelo,
        v.Tipo AS VehiculoTipo,
        v.Matricula AS VehiculoMatricula,
        a.Nombre AS AdministradorNombre,
        c.Nombre AS ConductorNombre,
        c.Licencia AS ConductorLicencia,
        hp.idHistorial,
        hp.EstadoAnterior,
        hp.EstadoActual,
        hp.FechaModificacion
    FROM Historial_Pedido hp
    JOIN Pedido p ON hp.Pedido_idPedido = p.idPedido
    JOIN Vehiculo v ON p.idVehiculo = v.idVehiculo
    JOIN Administrador a ON p.idAdministrador = a.idAdministrador
    LEFT JOIN Vehiculo_has_Conductor vc ON v.idVehiculo = vc.idVehiculo
    LEFT JOIN Conductor c ON vc.idConductor = c.idConductor
    WHERE hp.Pedido_idPedido = xidPedido
    ORDER BY hp.FechaModificacion DESC;
END $$
DELIMITER $$;

DELIMITER $$
Call Query_Historial_Pedido(1) $$
DELIMITER $$;
/*--------------------------------------------------------*/
-- Consulta que tree los pedidos asignados a un vehiculo (por idVehiculo)
/*--------------------------------------------------------*/
DELIMITER $$
DROP PROCEDURE IF EXISTS Query_Pedidos_Por_Vehiculo $$
CREATE PROCEDURE Query_Pedidos_Por_Vehiculo (IN xidVehiculo INT)
BEGIN
    SELECT 
        p.idPedido,
        p.Nombre AS NombrePedido,
        p.Peso,
        p.Volumen,
        p.Estado AS EstadoPedido,
        p.Origen,
        p.Destino,
        a.Nombre AS AdministradorNombre,
        e.Nombre AS EmpresaDestino
    FROM Pedido p
    JOIN Administrador a ON p.idAdministrador = a.idAdministrador
    JOIN Empresa e ON p.idEmpresa = e.idEmpresa
    JOIN Vehiculo v ON p.idVehiculo = v.idVehiculo
    LEFT JOIN Vehiculo_has_Conductor vc ON v.idVehiculo = vc.idVehiculo
    LEFT JOIN Conductor c ON vc.idConductor = c.idConductor
    WHERE p.idVehiculo = xidVehiculo
    ORDER BY p.idPedido;
END $$
