// src/models/Administrador.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Empresa from './empresa.js';

const Administrador = sequelize.define('Administrador', {
  idAdministrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Contrasena: {
    type: DataTypes.STRING(45),
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
  tableName: 'Administrador',
  timestamps: false
});

export default Administrador;
