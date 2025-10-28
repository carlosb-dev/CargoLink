-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cargolink
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cargolink` ;

-- -----------------------------------------------------
-- Schema cargolink
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cargolink` DEFAULT CHARACTER SET utf8 ;
USE `cargolink` ;

-- -----------------------------------------------------
-- Table `cargolink`.`Empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cargolink`.`Empresa` ;

CREATE TABLE IF NOT EXISTS `cargolink`.`Empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  UNIQUE INDEX `nombre_UNIQUE` (`Nombre` ASC) VISIBLE,
  UNIQUE INDEX `contrasena_UNIQUE` (`Contrasena` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cargolink`.`Administrador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cargolink`.`Administrador` ;

CREATE TABLE IF NOT EXISTS `cargolink`.`Administrador` (
  `idAdministrador` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE INDEX `email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_Administradores_Empresa_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Administradores_Empresa`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `cargolink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cargolink`.`Conductor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cargolink`.`Conductor` ;

CREATE TABLE IF NOT EXISTS `cargolink`.`Conductor` (
  `idConductor` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Licencia` VARCHAR(45) NOT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idConductor`),
  INDEX `fk_Concuctores_Empresa1_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Concuctores_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `cargolink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cargolink`.`Vehiculo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cargolink`.`Vehiculo` ;

CREATE TABLE IF NOT EXISTS `cargolink`.`Vehiculo` (
  `idVehiculo` INT NOT NULL,
  `Modelo` VARCHAR(45) NOT NULL,
  `Tipo` VARCHAR(45) NOT NULL,
  `Matricula` VARCHAR(45) NOT NULL,
  `Capacidad` INT NOT NULL,
  `Cantidad_Paquetes` INT NULL,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idVehiculo`),
  UNIQUE INDEX `Tipo_UNIQUE` (`Tipo` ASC) VISIBLE,
  UNIQUE INDEX `matricula_UNIQUE` (`Matricula` ASC) VISIBLE,
  UNIQUE INDEX `Capacidad_UNIQUE` (`Capacidad` ASC) VISIBLE,
  INDEX `fk_Vehiculos_Empresa1_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Vehiculos_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `cargolink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cargolink`.`Vehiculo_has_Conductor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cargolink`.`Vehiculo_has_Conductor` ;

CREATE TABLE IF NOT EXISTS `cargolink`.`Vehiculo_has_Conductor` (
  `idVehiculo` INT NOT NULL,
  `idConductor` INT NOT NULL,
  `Fecha_Asignacion` DATETIME NULL,
  PRIMARY KEY (`idVehiculo`, `idConductor`),
  INDEX `fk_Vehiculos_has_Conductores_Conductores1_idx` (`idConductor` ASC) VISIBLE,
  INDEX `fk_Vehiculos_has_Conductores_Vehiculos1_idx` (`idVehiculo` ASC) VISIBLE,
  CONSTRAINT `fk_Vehiculos_has_Conductores_Vehiculos1`
    FOREIGN KEY (`idVehiculo`)
    REFERENCES `cargolink`.`Vehiculo` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Vehiculos_has_Conductores_Conductores1`
    FOREIGN KEY (`idConductor`)
    REFERENCES `cargolink`.`Conductor` (`idConductor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cargolink`.`Pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cargolink`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `cargolink`.`Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Peso` DOUBLE NOT NULL,
  `Volumen` DOUBLE NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
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
    REFERENCES `cargolink`.`Vehiculo` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_Administradores1`
    FOREIGN KEY (`idAdministrador`)
    REFERENCES `cargolink`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `cargolink`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
