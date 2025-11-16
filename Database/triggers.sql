/*-------------------------------------------*/
-- Triggers
/*-------------------------------------------*/

DELIMITER $$

DROP TRIGGER IF EXISTS AftInsertPedido $$
CREATE TRIGGER AftInsertPedido
AFTER INSERT ON Pedido
FOR EACH ROW
BEGIN
    INSERT INTO Historial_Pedido (EstadoAnterior, EstadoActual, FechaModificacion, Pedido_idPedido)
    VALUES ('Creado', NEW.Estado, NOW(), NEW.idPedido);
END $$
DELIMITER ;

DELIMITER $$

DROP TRIGGER IF EXISTS AftUpdatePedido $$
CREATE TRIGGER AftUpdatePedido AFTER UPDATE ON Pedido
FOR EACH ROW
BEGIN
    IF NEW.Estado != OLD.Estado THEN
        INSERT INTO Historial_Pedido (EstadoAnterior, EstadoActual, FechaModificacion, Pedido_idPedido)
        VALUES (OLD.Estado, NEW.Estado, NOW(), NEW.idPedido);
    END IF;
END $$