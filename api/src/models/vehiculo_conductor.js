// src/models/VehiculoConductor.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Vehiculo from './vehiculo.js';
import Conductor from './conductor.js';

const VehiculoConductor = sequelize.define('VehiculoConductor', {
  idVehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Vehiculo,
      key: 'idVehiculo'
    }
  },
  idConductor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Conductor,
      key: 'idConductor'
    }
  },
  Fecha_Asignacion: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Vehiculo_has_Conductor',
  timestamps: false
});

export default VehiculoConductor;
