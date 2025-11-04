-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CargoLink
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `CargoLink` ;

-- -----------------------------------------------------
-- Schema CargoLink
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CargoLink` DEFAULT CHARACTER SET utf8 ;
USE `CargoLink` ;

-- -----------------------------------------------------
-- Table `CargoLink`.`Empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Empresa` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(45) NOT NULL,
  `Direccion` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  UNIQUE INDEX `nombre_UNIQUE` (`Nombre` ASC) VISIBLE,
  UNIQUE INDEX `contrasena_UNIQUE` (`Contrasena` ASC) VISIBLE,
  UNIQUE INDEX `Direccion_UNIQUE` (`Direccion` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CargoLink`.`Administrador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Administrador` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Administrador` (
  `idAdministrador` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE INDEX `email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_Administradores_Empresa_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Administradores_Empresa`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `CargoLink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CargoLink`.`Conductor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Conductor` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Conductor` (
  `idConductor` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Licencia` VARCHAR(45) NOT NULL,
  `Estado` TINYINT NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idConductor`),
  INDEX `fk_Concuctores_Empresa1_idx` (`idEmpresa` ASC) VISIBLE,
  UNIQUE INDEX `Licencia_UNIQUE` (`Licencia` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  CONSTRAINT `fk_Concuctores_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `CargoLink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CargoLink`.`Vehiculo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Vehiculo` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Vehiculo` (
  `idVehiculo` INT NOT NULL AUTO_INCREMENT,
  `Modelo` VARCHAR(45) NOT NULL,
  `Tipo` VARCHAR(45) NOT NULL,
  `Matricula` VARCHAR(45) NOT NULL,
  `Capacidad` INT NOT NULL,
  `Cantidad_Paquetes` INT NOT NULL,
  `Estado` TINYINT NOT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idVehiculo`),
  UNIQUE INDEX `matricula_UNIQUE` (`Matricula` ASC) VISIBLE,
  INDEX `fk_Vehiculos_Empresa1_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Vehiculos_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `CargoLink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CargoLink`.`Vehiculo_has_Conductor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Vehiculo_has_Conductor` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Vehiculo_has_Conductor` (
  `idVehiculo` INT NOT NULL,
  `idConductor` INT NOT NULL,
  `Fecha_Asignacion` DATETIME NULL,
  PRIMARY KEY (`idVehiculo`, `idConductor`),
  INDEX `fk_Vehiculos_has_Conductores_Conductores1_idx` (`idConductor` ASC) VISIBLE,
  INDEX `fk_Vehiculos_has_Conductores_Vehiculos1_idx` (`idVehiculo` ASC) VISIBLE,
  CONSTRAINT `fk_Vehiculos_has_Conductores_Vehiculos1`
    FOREIGN KEY (`idVehiculo`)
    REFERENCES `CargoLink`.`Vehiculo` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Vehiculos_has_Conductores_Conductores1`
    FOREIGN KEY (`idConductor`)
    REFERENCES `CargoLink`.`Conductor` (`idConductor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CargoLink`.`Pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Peso` DOUBLE NOT NULL,
  `Volumen` DOUBLE NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
  'Fecha_Despacho' DATE NOT NULL,
  `Origen` VARCHAR(45) NOT NULL,
  `Destino` VARCHAR(45) NOT NULL,
  `idVehiculo` INT NOT NULL,
  `idAdministrador` INT NOT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idPedido`),
  INDEX `fk_pedido_Vehiculos1_idx` (`idVehiculo` ASC) VISIBLE,
  INDEX `fk_pedido_Administradores1_idx` (`idAdministrador` ASC) VISIBLE,
  INDEX `fk_pedido_Empresa1_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_Vehiculos1`
    FOREIGN KEY (`idVehiculo`)
    REFERENCES `CargoLink`.`Vehiculo` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_Administradores1`
    FOREIGN KEY (`idAdministrador`)
    REFERENCES `CargoLink`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `CargoLink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CargoLink`.`Historial_Pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoLink`.`Historial_Pedido` ;

CREATE TABLE IF NOT EXISTS `CargoLink`.`Historial_Pedido` (
  `idHistorial` INT NOT NULL AUTO_INCREMENT,
  `EstadoAnterior` VARCHAR(45) NOT NULL,
  `EstadoActual` VARCHAR(45) NOT NULL,
  `FechaModificacion` DATE NOT NULL,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`idHistorial`),
  INDEX `fk_Historial_Pedido_Pedido1_idx` (`Pedido_idPedido` ASC) VISIBLE,
  CONSTRAINT `fk_Historial_Pedido_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `CargoLink`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
