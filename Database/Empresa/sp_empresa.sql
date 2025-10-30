/*-----------------------------------------------*/
-- Store Procedures Tabla Empresa
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Empresa_insertar;
CREATE PROCEDURE sp_Empresa_insertar (OUT xidEmpresa INT, IN xNombre varchar(45), IN xContrasena varchar(45), IN xDireccion varchar(45))
BEGIN
	INSERT INTO Empresa (Nombre, Contrasena, Direccion)
	VALUES (xNombre, SHA2(xContrasena, 256), xDireccion);
	set xidEmpresa = last_insert_id();
END $$

/*-----------------------------------------------*/
-- Store Procedure para el logueo de la Empresa
/*-----------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE sp_LoginEmpresa(IN xNombre VARCHAR(45),IN xContrasena VARCHAR(255))
BEGIN
    DECLARE vCount INT;

    SELECT COUNT(*) INTO vCount
    FROM Empresa
    WHERE Nombre = xNombre AND Contrasena = SHA2(xContrasena, 256);

    IF vCount = 1 THEN
        SELECT idEmpresa, Nombre, Direccion
        FROM Empresa
        WHERE Nombre = xNombre AND Contrasena = SHA2(xContrasena, 256);
    ELSE
        SELECT NULL AS idEmpresa, NULL AS Nombre, NULL AS Direccion;
    END IF;
END $$