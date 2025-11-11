-- Active: 1762861313268@@127.0.0.1@3306@cargolink
/*-----------------------------------------------*/
-- Store Procedures Tabla Administrador
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Administrador_insertar;
CREATE PROCEDURE sp_Administrador_insertar (OUT xidAdministrador INT, IN xNombre varchar(45), IN xContrasena varchar(45), IN xEmail Varchar(100), IN xidEmpresa INT)
BEGIN
	INSERT INTO Administrador (Nombre, Contrasena, Email, idEmpresa)
	VALUES (xNombre, SHA2(xContrasena, 256), xEmail, xidEmpresa);
	set xidAdministrador = last_insert_id();
END $$

/*-----------------------------------------------*/
-- Store Procedures Tabla Administrador
/*-----------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Administrador_Eliminar $$
CREATE PROCEDURE sp_Administrador_Eliminar(IN xidAdministrador INT)
BEGIN
	DELETE FROM Administrador
	WHERE idAdministrador = xidAdministrador;
END $$

/*-----------------------------------------------*/
-- Store Procedures ACTUALIZAR Administrador
/*-----------------------------------------------*/

DELIMITER $$
Drop PROCEDURE IF EXISTS sp_Administador_Actualizar $$
CREATE PROCEDURE sp_Administador_Actualizar(IN xidAdministrador INT,IN xNombre VARCHAR(45),IN xContrasena VARCHAR(45), IN xEmail VARCHAR(100))
BEGIN
	UPDATE Administrador
	SET Nombre = xNombre, Contrasena = xContrasena, Email = xEmail
	WHERE idAdministrador = xidAdministrador;
END $$

/*---------------------------------------------------*/
-- Store Procedures INICIAR SESION Administrador
/*---------------------------------------------------*/

DELIMITER $$
DROP PROCEDURE if EXISTS sp_LoginAdministrador $$
CREATE PROCEDURE sp_LoginAdministrador(IN xEmail VARCHAR(45), IN xContrasena VARCHAR(45))
BEGIN
    DECLARE vCount INT;

    SELECT COUNT(*) INTO vCount
    FROM Administrador
    WHERE Email = xEmail AND Contrasena = SHA2(xContrasena, 256);

    IF vCount = 1 THEN
        SELECT idAdministrador, Nombre, Email, idEmpresa
        FROM Administrador WHERE Email = xEmail;
    ELSE
        SELECT NULL AS idAdministrador, NULL AS Nombre, NULL AS Email, NULL AS idEmpresa;
    END IF;
END $$

