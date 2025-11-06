// src/models/Conductor.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Empresa from './empresa.js';

const Conductor = sequelize.define('Conductor', {
  idConductor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Licencia: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  Estado: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
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
  tableName: 'Conductor',
  timestamps: false
});

export default Conductor;
