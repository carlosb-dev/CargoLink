/*-----------------------------------------------*/
-- Store Procedures INSERTAR Tabla Vehiculo-Conductor
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Vehiculo_Conductor_insertar $$
CREATE PROCEDURE sp_Vehiculo_Conductor_insertar (IN xidVehiculo INT, IN xidConductor INT)
BEGIN
	INSERT INTO Vehiculo_has_Conductor (idVehiculo, idConductor)
	VALUES (xidVehiculo, xidConductor, CURDATE());
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
    
	IF(estado_vehiculo = TRUE) THEN
    	IF(estado_Conductor = TRUE) THEN
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
