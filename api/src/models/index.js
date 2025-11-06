// src/models/index.js
import sequelize from '../config/db.js';
import Empresa from './empresa.js';
import Administrador from './administrador.js';
import Conductor from './conductor.js';
import Vehiculo from './vehiculo.js';
import VehiculoConductor from './vehiculo_conductor.js';
import Pedido from './pedido.js';
import HistorialPedido from './historialpedido.js';

// Relaciones Empresa
Empresa.hasMany(Administrador, { foreignKey: 'idEmpresa' });
Empresa.hasMany(Conductor, { foreignKey: 'idEmpresa' });
Empresa.hasMany(Vehiculo, { foreignKey: 'idEmpresa' });
Empresa.hasMany(Pedido, { foreignKey: 'idEmpresa' });

// Relaciones Administrador
Administrador.belongsTo(Empresa, { foreignKey: 'idEmpresa' });
Administrador.hasMany(Pedido, { foreignKey: 'idAdministrador' });

// Relaciones Conductor ↔ Vehiculo (N:M)
Conductor.belongsToMany(Vehiculo, {
  through: VehiculoConductor,
  foreignKey: 'idConductor'
});
Vehiculo.belongsToMany(Conductor, {
  through: VehiculoConductor,
  foreignKey: 'idVehiculo'
});

// Relaciones Vehiculo y Pedido
Vehiculo.hasMany(Pedido, { foreignKey: 'idVehiculo' });
Pedido.belongsTo(Vehiculo, { foreignKey: 'idVehiculo' });

// HistorialPedido → Pedido
Pedido.hasMany(HistorialPedido, { foreignKey: 'Pedido_idPedido' });
HistorialPedido.belongsTo(Pedido, { foreignKey: 'Pedido_idPedido' });

export {
  sequelize,
  Empresa,
  Administrador,
  Conductor,
  Vehiculo,
  VehiculoConductor,
  Pedido,
  HistorialPedido
};
