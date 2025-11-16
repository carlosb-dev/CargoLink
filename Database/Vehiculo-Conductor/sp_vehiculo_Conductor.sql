/*-----------------------------------------------*/
-- Store Procedures INSERTAR Tabla Vehiculo-Conductor
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Vehiculo_Conductor_insertar $$
CREATE PROCEDURE sp_Vehiculo_Conductor_insertar (IN xidVehiculo INT, IN xidConductor INT)
BEGIN
	SELECT v.Estado into @estado_vehiculo
	from vehiculo v
	where idVehiculo = xidVehiculo;
    
	SELECT c.Estado into @estado_Conductor
	from conductor c
	where idconductor = xidConductor;

	IF(@estado_vehiculo = 1) THEN
		IF(@estado_Conductor = 1) THEN
			INSERT INTO Vehiculo_has_Conductor (idVehiculo, idConductor, Fecha_Asignacion)
			VALUES (xidVehiculo, xidConductor, CURDATE());
		ELSE
			SIGNAL SQLSTATE '45000'
        	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el Conductor. ESTADO DEL CONDUCTOR = 0';
    	END IF;
	ELSE
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el vehiculo. ESTADO DEL VEHICULO = 0';
	END IF;
END $$

/*-----------------------------------------------*/
-- Store Procedures ELIMINAR Tabla Vehiculo-Conductor
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Vehiculo_Conductor_Eliminar $$
CREATE PROCEDURE sp_Vehiculo_Conductor_Eliminar (IN xidVehiculo INT, IN xidConductor INT)
BEGIN
	SELECT estado into @estado_vehiculo
	from vehiculo
	where idVehiculo = xidVehiculo;
    
	SELECT estado into @estado_Conductor
	from conductor
	where idconductor = xidConductor;
    
	IF(@estado_vehiculo = TRUE) THEN
    	IF(@estado_Conductor = TRUE) THEN
        	DELETE FROM Vehiculo_has_Conductor
        	where idVehiculo = xidVehiculo AND idconductor = xidConductor;
    	ELSE
        	SIGNAL SQLSTATE '45000'
        	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el vehiculo. ESTADO DEL CONDUCTOR = 0';
    	END IF;
	ELSE
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el vehiculo. ESTADO DEL VEHICULO = 0';
	END IF;
END $$
