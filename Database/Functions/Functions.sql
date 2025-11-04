/*-------------------------------------*/
-- Funcion para retornar la cantidad de paquetes por vehiculo
/*-------------------------------------*/

DELIMITER $$
DROP FUNCTION IF EXISTS Calcular_Cantidad_Pedidos_Estado $$
CREATE FUNCTION Calcular_Cantidad_Pedidos_Estado(xEstado VARCHAR(45)) 
RETURNS INT READS SQL DATA
BEGIN
    DECLARE total INT;
    
    SELECT COUNT(*) INTO total
    FROM Pedido
    JOIN Empresa ON Pedido.idEmpresa = Empresa.idEmpresa
    WHERE Estado = xEstado and idEmpresa = xidEmpresa;
    
    RETURN total;
END $$
DELIMITER;

/*-------------------------------------*/
-- Funcion para la capacidad restante del vehiculo
/*-------------------------------------*/

DELIMITER $$
DROP FUNCTION IF EXISTS Restar_Capacidad_Vehiculo $$
CREATE FUNCTION Restar_Capacidad_Vehiculo(p_idVehiculo INT, p_paquetes INT, p_peso INT)
RETURNS VARCHAR(100)
MODIFIES SQL DATA
BEGIN
    DECLARE mensaje VARCHAR(100);

    UPDATE Vehiculo
    SET Cantidad_Paquetes = Cantidad_Paquetes - p_paquetes,
        Capacidad = Capacidad - p_peso
    WHERE idVehiculo = p_idVehiculo;

    SET mensaje = CONCAT('Se restaron ', p_paquetes, ' paquetes y ', p_peso, ' kg de capacidad.');
    RETURN mensaje;
END $$
DELIMITER ;

/*-------------------------------------*/
-- Funcion para retornar la sumatoria de paquetes por vehiculo
/*-------------------------------------*/

DELIMITER $$
DROP FUNCTION IF EXISTS Sumar_Capacidad_Vehiculo $$
CREATE FUNCTION Sumar_Capacidad_Vehiculo(p_idVehiculo INT, p_paquetes INT, p_peso INT)
RETURNS VARCHAR(100)
MODIFIES SQL DATA
BEGIN
    DECLARE mensaje VARCHAR(100);

    UPDATE Vehiculo
    SET Cantidad_Paquetes = Cantidad_Paquetes + p_paquetes,
        Capacidad = Capacidad + p_peso
    WHERE idVehiculo = p_idVehiculo;

    SET mensaje = CONCAT('Se restauraron ', p_paquetes, ' paquetes y ', p_peso, ' kg de capacidad.');
    RETURN mensaje;
END $$
DELIMITER ;

/*-------------------------------------*/
--  Actualizar estado de conductor y vehículo (poner en 0 = no disponible)
/*-------------------------------------*/

DELIMITER $$
DROP FUNCTION IF EXISTS Actualizar_Estado_ConductorYVehiculo $$
CREATE FUNCTION ActualizarEstadoConductorYVehiculo(p_idConductor INT, p_idVehiculo INT)
RETURNS VARCHAR(100)
MODIFIES SQL DATA
BEGIN
    DECLARE mensaje VARCHAR(100);

    UPDATE Conductor SET Estado = 0 WHERE idConductor = p_idConductor;
    UPDATE Vehiculo SET Estado = 0 WHERE idVehiculo = p_idVehiculo;

    SET mensaje = 'Conductor y vehículo actualizados a NO disponibles.';
    RETURN mensaje;
END $$
DELIMITER ;

/*-------------------------------------*/
--  Restaurar estado de conductor y vehículo  (poner en 1 = disponible)
/*-------------------------------------*/

DELIMITER $$
DROP FUNCTION IF EXISTS Restaurar_Estado_ConductorYVehiculo $$
CREATE FUNCTION RestaurarEstadoConductorYVehiculo(p_idConductor INT, p_idVehiculo INT)
RETURNS VARCHAR(100)
MODIFIES SQL DATA
BEGIN
    DECLARE mensaje VARCHAR(100);

    UPDATE Conductor SET Estado = 1 WHERE idConductor = p_idConductor;
    UPDATE Vehiculo SET Estado = 1 WHERE idVehiculo = p_idVehiculo;

    SET mensaje = 'Conductor y vehículo restaurados a disponibles.';
    RETURN mensaje;
END $$
DELIMITER ;


