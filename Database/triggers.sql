/*-------------------------------------------*/
-- Triggers
/*-------------------------------------------*/

DELIMITER $$

Drop Trigger if exists AftInsertPedido $$
CREATE TRIGGER AftInsertPedido AFTER INSERT ON Pedido
FOR EACH ROW
BEGIN
    INSERT INTO HistorialPedido (EstadoAnterior, EstadoActual, FechaModificacion, idPedido)
    VALUES ("Creado", NEW.Estado, NOW(), NEW.idPedido);
END $$

DELIMITER $$

DROP TRIGGER IF EXISTS AftUpdatePedido $$
CREATE TRIGGER AftUpdatePedido AFTER UPDATE ON Pedido
FOR EACH ROW
BEGIN
    IF NEW.Estado != OLD.Estado THEN
        INSERT INTO HistorialPedido (EstadoAnterior, EstadoActual, FechaModificacion, idPedido)
        VALUES (OLD.Estado, NEW.Estado, NOW(), NEW.idPedido);
    END IF;
END $$