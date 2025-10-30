/*-----------------------------------------------*/
-- Store Procedures Tabla Conductor
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Conductor_insertar;
CREATE PROCEDURE sp_Conductor_insertar (OUT xidConductor INT, IN xNombre varchar(45), IN xLicencia varchar(45), IN xidEmpresa INT)
BEGIN
	INSERT INTO Conductor (Nombre, Licencia, estado, idEmpresa)
	VALUES (xNombre, xLicencia, true ,xidEmpresa);
	set xidConductor = last_insert_id();
END $$

/*---------------------------------------------*/
-- Store procedure para Actualizar
/*---------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Conductor_Actualizar $$
CREATE PROCEDURE sp_Conductor_Actualizar(IN xidConductor INT,IN xNombre VARCHAR(45),IN xLicencia VARCHAR(45))
BEGIN
	select estado into @estado_actual
	from conductor
	WHERE idConductor = xidConductor;
    
	IF (estado = TRUE) THEN
    	UPDATE Conductor
    	SET Nombre = xNombre, Licencia = xLicencia
    	WHERE idConductor = xidConductor;
	else
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el conductor. ESTADO DEL CONDUCTOR = 0';
	END IF;
END $$

/*---------------------------------------------*/
-- Store procedure para Eliminar
/*---------------------------------------------*/

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_Conductor_Eliminar $$
CREATE PROCEDURE sp_Conductor_Eliminar (IN xidConductor INT)
BEGIN
	select estado into @estado_actual
	from conductor
	WHERE idConductor = xidConductor;
    
	IF (estado = TRUE) THEN
    	DELETE FROM Conductor
    	WHERE idConductor = xidConductor;
	ELSE
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ELIMINAR el conductor. ESTADO DEL CONDUCTOR = 0';
	END IF;
END $$

/*-------------------------------------------*/
-- Store procedure INICIAR SESION Conductor
/*-------------------------------------------*/

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_LoginConductor $$
CREATE PROCEDURE sp_LoginConductor(IN xLicencia VARCHAR(45))
BEGIN
    DECLARE vCount INT;

    SELECT COUNT(*) INTO vCount
    FROM Conductor
    WHERE Licencia = xLicencia;

    IF vCount = 1 THEN
        SELECT idConductor, Nombre, Licencia, Estado, idEmpresa
        FROM Conductor
        WHERE Licencia = xLicencia;
    ELSE
        SELECT NULL AS idConductor, NULL AS Nombre, NULL AS Licencia, NULL AS Estado, NULL AS idEmpresa;
    END IF;
END $$
