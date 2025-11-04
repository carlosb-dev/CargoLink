/*-----------------------------------------------*/
-- Store Procedures INSERTAR Tabla Pedido
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Pedido_insertar $$
CREATE PROCEDURE sp_Pedido_insertar (out xidPedido INT, IN xNombre VARCHAR(45), IN xPeso DOUBLE, IN xVolumen DOUBLE, IN xEstado Varchar(45), IN xOrigen Varchar(45), IN xDestino Varchar(45), IN xidVehiculo INT, IN xidAdministrador INT, IN xidEmpresa INT)
BEGIN
	INSERT INTO Pedido (xNombre, xPeso, xVolumen, xEstado, xOrigen, xDestino, xidVehiculo, xidAdministrador, xidEmpresa)
	VALUES (xNombre, xPeso, xVolumen, xEstado, xOrigen, xDestino, xidVehiculo, xidAdministrador, xidEmpresa);
	set xidPedido = last_insert_id();
END $$
DELIMITER $$

/*-----------------------------------------------*/
-- Store Procedures ACTUALIZAR Tabla Pedido
/*-----------------------------------------------*/

DELIMITER $$
DROP procedure IF EXISTS sp_Pedido_actualizar $$
CREATE PROCEDURE sp_Pedido_actualizar (IN xidPedido INT, IN xEstado Varchar(45))
BEGIN
	UPDATE Pedido 
	SET xEstado = xEstado
	WHERE xidPedido = xidPedido;
END $$
DELIMITER $$
