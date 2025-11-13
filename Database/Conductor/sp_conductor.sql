/*-----------------------------------------------*/
-- Store Procedures Tabla Conductor
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Conductor_insertar;
CREATE PROCEDURE sp_Conductor_insertar (OUT xidConductor INT, IN xNombre varchar(45), IN xLicencia varchar(45), IN xEmail Varchar(100),IN xidEmpresa INT)
BEGIN
	INSERT INTO Conductor (Nombre, Licencia, estado, Email, idEmpresa)
	VALUES (xNombre, xLicencia, true, xEmail, xidEmpresa);
	set xidConductor = last_insert_id();
END $$

/*---------------------------------------------*/
-- Store procedure para Actualizar
/*---------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Conductor_Actualizar $$
CREATE PROCEDURE sp_Conductor_Actualizar(IN xidConductor INT,IN xNombre VARCHAR(45),IN xLicencia VARCHAR(45), IN xEmail Varchar(100))
BEGIN
	select c.Estado into @estado_actual
	from conductor c
	WHERE idConductor = xidConductor;
    
	IF (@estado_actual = TRUE) THEN
    	UPDATE Conductor
    	SET Nombre = xNombre, Licencia = xLicencia, Email = xEmail
    	WHERE idConductor = xidConductor;
	else
    	SIGNAL SQLSTATE '45000'
    	SET MESSAGE_TEXT = 'No se puede ACTUALIZAR el conductor. ESTADO DEL CONDUCTOR = 0';
	END IF;
END $$

/*---------------------------------------------*/
-- Store procedure para Actualizar Unicamente Estado del conductor
/*---------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Conductor_actualizar_estado_ocupado $$
CREATE PROCEDURE sp_Conductor_actualizar_estado_ocupado(IN xidConductor INT,IN xEstado INT)
BEGIN
	UPDATE Conductor
	SET Estado = 0
	WHERE idConductor = xidConductor;
END $$

/*---------------------------------------------*/
-- Store procedure para Actualizar Liberar Unicamente Estado del conductor
/*---------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Conductor_actualizar_estado_Liberar $$
CREATE PROCEDURE sp_Conductor_actualizar_estado_Liberar(IN xidConductor INT,IN xEstado INT)
BEGIN
	UPDATE Conductor
	SET Estado = 1
	WHERE idConductor = xidConductor;
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
    
	IF (@estado_actual = TRUE) THEN
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
CREATE PROCEDURE sp_LoginConductor(IN xLicencia VARCHAR(45), IN xEmail Varchar(100))
BEGIN
    DECLARE vCount INT;

    SELECT COUNT(*) INTO vCount
    FROM Conductor
    WHERE Licencia = xLicencia;

    IF vCount = 1 THEN
        SELECT idConductor, Nombre, Licencia, Estado, idEmpresa
        FROM Conductor
        WHERE Licencia = xLicencia AND Email = xEmail;
    ELSE
        SELECT NULL AS idConductor, NULL AS Nombre, NULL AS Licencia, NULL AS Estado, NULL AS idEmpresa;
    END IF;
END $$
