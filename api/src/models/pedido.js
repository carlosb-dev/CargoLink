// src/models/Pedido.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Vehiculo from './vehiculo.js';
import Administrador from './administrador.js';
import Empresa from './empresa.js';

const Pedido = sequelize.define('Pedido', {
  idPedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Peso: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Volumen: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Estado: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Fecha_Despacho: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Origen: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Destino: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  idVehiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Vehiculo, key: 'idVehiculo' }
  },
  idAdministrador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Administrador, key: 'idAdministrador' }
  },
  idEmpresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Empresa, key: 'idEmpresa' }
  }
}, {
  tableName: 'Pedido',
  timestamps: false
});

export default Pedido;
