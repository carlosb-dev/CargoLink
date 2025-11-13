-- Active: 1762879183741@@127.0.0.1@3306@cargolink
-- ==============================================
-- TEST: Insertar Empresa
-- ==============================================
DELIMITER  $$
CALL sp_Empresa_insertar(@idEmpresa1, 'EmpresaTest', '123456', 'Av Siempreviva 123', 'empresa@test.com')  $$

-- ==============================================
-- TEST: Login Empresa (Correcto)
-- ==============================================
CALL sp_LoginEmpresa('empresa@test.com', '123456')  $$

-- ==============================================
-- TEST: Insertar Administrador
-- ==============================================
CALL sp_Administrador_insertar(@idAdmin, 'AdminTest', 'admin123', 'admin@test.com', @idEmpresa1)  $$
CALL sp_Administrador_insertar(@idAdmin2, 'AdminTest2', 'admin1234', 'admin2@test.com', @idEmpresa1)  $$

-- ==============================================
-- TEST: Login Administrador (Correcto)
-- ==============================================
CALL sp_LoginAdministrador('admin@test.com', 'admin123') $$

-- ==============================================
-- TEST: Actualizar Administrador
-- ==============================================
CALL sp_Administador_Actualizar(@idAdmin, 'AdminActualizado', 'admin456', 'nuevo@test.com') $$
SELECT * FROM Administrador WHERE idAdministrador = @idAdmin $$

-- ==============================================
-- TEST: Eliminar Administrador
-- ==============================================
CALL sp_Administrador_Eliminar(@idAdmin) $$

-- ==============================================
-- TEST: Insertar Conductor
-- ==============================================
CALL sp_Conductor_insertar(@idConductor, 'Juan Perez', 'LIC1234', 'conductor@test.com', @idEmpresa1) $$
CALL sp_Conductor_insertar(@idConductor2, 'pepe', '2345678', 'pepe@test.com', @idEmpresa1) $$

SELECT @idConductor AS idInsertado $$
SELECT * FROM Conductor WHERE idConductor = @idConductor $$

-- ==============================================
-- TEST: Actualizar Conductor (Estado = TRUE)
-- ==============================================
CALL sp_Conductor_Actualizar(@idConductor, 'Juan', 'LIC9999', 'nuevo@test.com') $$

-- ==============================================
-- TEST: Cambiar Estado a Ocupado y luego Liberar
-- ==============================================
CALL sp_Conductor_actualizar_estado_ocupado(@idConductor, 0) $$

CALL sp_Conductor_actualizar_estado_Liberar(@idConductor, 1) $$

-- ==============================================
-- TEST: Eliminar Conductor (Debe funcionar solo si Estado=1)
-- ==============================================
CALL sp_Conductor_Eliminar(@idConductor) $$

-- ==============================================
-- TEST: Insertar Vehículo
-- ==============================================
CALL sp_Vehiculo_insertar(@idVehiculo, 'Camión Ford', 'Camión', 'ABC123', 5000, 100, @idEmpresa1) $$
CALL sp_Vehiculo_insertar(@idVehiculo1, 'Camión Ford', 'Camión', 'ABC1234', 5000, 100, @idEmpresa1) $$

-- ==============================================
-- TEST: Actualizar Matrícula (Estado TRUE)
-- ==============================================
CALL sp_Vehiculo_Actualizar(@idVehiculo, 'XYZ789') $$

-- ==============================================
-- TEST: Cambiar Estado Ocupado / Disponible
-- ==============================================
CALL sp_Vehiculo_actualizar_estado_Ocupado(@idVehiculo, 0) $$

CALL sp_Vehiculo_actualizar_estado_Disponible(@idVehiculo, 1) $$

-- ==============================================
-- TEST: Eliminar Vehículo (Solo si Estado=1)
-- ==============================================
CALL sp_Vehiculo_Eliminar(@idVehiculo) $$

-- ==============================================
-- TEST: Insertar Pedido
-- ==============================================
CALL sp_Pedido_insertar(@idPedido, 'Cajas de prueba', 100.5, 2.3, 'Pendiente', CURDATE(), 'Buenos Aires', 'Rosario', @idVehiculo1, @idAdmin2, @idEmpresa1) $$

-- ==============================================
-- TEST: Actualizar Estado del Pedido
-- ==============================================
CALL sp_Pedido_actualizar_estado(@idPedido, 'Entregado') $$

-- ==============================================
-- TEST: Asignar Conductor a Vehículo
-- ==============================================

CALL sp_Vehiculo_Conductor_insertar(@idVehiculo1, @idConductor2) $$

-- ==============================================
-- TEST: Eliminar Asignación
-- ==============================================
CALL sp_Vehiculo_Conductor_Eliminar(@idVehiculo2, @idVehiculo1) $$
