// src/models/HistorialPedido.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pedido from './pedido.js';

const HistorialPedido = sequelize.define('HistorialPedido', {
  idHistorial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  EstadoAnterior: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  EstadoActual: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  FechaModificacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Pedido_idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pedido,
      key: 'idPedido'
    }
  }
}, {
  tableName: 'Historial_Pedido',
  timestamps: false
});

export default HistorialPedido;
