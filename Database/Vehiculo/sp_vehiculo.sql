/*-----------------------------------------------*/
-- Store Procedures INSERTAR Tabla Vehiculo
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Vehiculo_insertar $$
CREATE PROCEDURE sp_Vehiculo_insertar (OUT xidVehiculo INT, IN xModelo varchar(45), IN xTipo varchar(45), IN xMatricula Varchar(45), IN xCapacidad INT, IN xCantidad_Paquetes INT, IN xidEmpresa INT)
BEGIN
	INSERT INTO Vehiculo (Modelo, Tipo, Matricula, Capacidad, Cantidad_Paquetes, Estado, idEmpresa)
	VALUES (xModelo, xTipo, xMatricula, xCapacidad, xCantidad_Paquetes, TRUE ,xidEmpresa);
	set xidVehiculo = last_insert_id();
END $$

/*---------------------------------------------*/
-- Store procedure para Actualizar
/*---------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Vehiculo_Actualizar $$
CREATE PROCEDURE sp_Vehiculo_Actualizar(IN xidVehiculo INT,IN xMatricula VARCHAR(45))
BEGIN
	select estado into @estado_actual
	from vehiculo
	WHERE idVehiculo = xidVehiculo;
    
	IF (estado = TRUE) THEN
    	UPDATE Vehiculo
    	SET Matricula = xMatricula
    	WHERE idVehiculo = xidVehiculo;
	else
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el vehiculo. ESTADO DEL VEHICULO = 0';
	END IF;
END $$

/*---------------------------------------------*/
-- Store procedure para Eliminar
/*---------------------------------------------*/

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_Vehiculo_Eliminar $$
CREATE PROCEDURE sp_Vehiculo_Eliminar (IN xidVehiculo INT)
BEGIN
	select estado into @estado_actual
	from vehiculo
	WHERE idVehiculo = xidVehiculo;
    
	IF (estado = TRUE) THEN
    	DELETE FROM Vehiculo
    	WHERE idVehiculo = xidVehiculo;
	ELSE
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el vehiculo. ESTADO DEL VEHICULO = 0';
	END IF;
END $$
