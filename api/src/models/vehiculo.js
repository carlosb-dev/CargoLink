// src/models/Vehiculo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Empresa from './empresa.js';

const Vehiculo = sequelize.define('Vehiculo', {
  idVehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Modelo: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Tipo: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Matricula: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  Capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cantidad_Paquetes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Estado: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  idEmpresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'idEmpresa'
    }
  }
}, {
  tableName: 'Vehiculo',
  timestamps: false
});

export default Vehiculo;
