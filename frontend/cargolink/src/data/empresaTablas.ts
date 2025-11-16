// Datos mockeados para las tablas de la sección Empresa.
// TODO: reemplazar por llamadas GET a la API cuando estén disponibles.

export const defaultAdmins = [
  { id: 0, nombre: "Sofía Díaz", email: "sofia@email.com" },
  { id: 1, nombre: "Pedro Ruiz", email: "pedro@email.com" },
];

export const defaultConductores = [
  { id: 0, nombre: "Juan Pérez", estado: "Activo", licencia: "QE92ND09" },
  { id: 1, nombre: "María Gómez", estado: "En Ruta", licencia: "AU28ODND" },
  { id: 2, nombre: "Luis Rodríguez", estado: "De Baja", licencia: "P1092NSI" },
];

export const defaultVehiculos = [
  { id: 0, placa: "AB-123-CD", modelo: "Volvo FH" },
  { id: 1, placa: "EF-456-GH", modelo: "Scania R500" },
  { id: 2, placa: "IJ-789-KL", modelo: "Iveco S-Way" },
];

export const defaultFlotaAsignaciones = [
  { id: 0, conductorId: 0, vehiculoId: 0 },
  { id: 1, conductorId: 1, vehiculoId: 1 },
];

export const defaultHistorialPedidos = [
  {
    id: 0,
    conductor: "Juan Pérez",
    matricula: "AB-123-CD",
    estadoAnterior: "En camino",
    estadoActual: "Entregado",
    fechaModificacion: "2024-05-12 14:30",
    nombrePedido: "Carga de insumos médicos",
    destino: "Hospital Central",
  },
  {
    id: 1,
    conductor: "María Gómez",
    matricula: "EF-456-GH",
    estadoAnterior: "Preparando",
    estadoActual: "Despachado",
    fechaModificacion: "2024-05-11 09:15",
    nombrePedido: "Componentes electrónicos",
    destino: "Parque Industrial Norte",
  },
  {
    id: 2,
    conductor: "Luis Rodríguez",
    matricula: "IJ-789-KL",
    estadoAnterior: "Despachado",
    estadoActual: "En camino",
    fechaModificacion: "2024-05-10 18:45",
    nombrePedido: "Repuestos automotrices",
    destino: "Concesionario Ruta 3",
  },
];

export const defaultPedidos = [
  {
    id: 0,
    nombre: "Materia prima plástica",
    peso: "3.2 Tn",
    destino: "Planta Sur",
    vehiculoId: defaultVehiculos[0].id,
    administradorId: defaultAdmins[0].id,
    estadoActual: "Entregado",
  },
  {
    id: 1,
    nombre: "Equipos electrónicos",
    peso: "1.5 Tn",
    destino: "Deposito Centro",
    vehiculoId: defaultVehiculos[1].id,
    administradorId: defaultAdmins[1].id,
    estadoActual: "En camino",
  },
  {
    id: 2,
    nombre: "Insumos médicos",
    peso: "900 Kg",
    destino: "Clínica Norte",
    vehiculoId: defaultVehiculos[2].id,
    administradorId: defaultAdmins[0].id,
    estadoActual: "Entregado",
  },
];
export const defaultOrdenes = [
  {
    id: 0,
    nombre: "Lotes textiles",
    peso: "2.4 Tn",
    destino: "Centro Comercial Norte",
    vehiculoId: defaultVehiculos[1].id,
    administradorId: defaultAdmins[0].id,
    estadoActual: "Preparando",
  },
  {
    id: 1,
    nombre: "Insumos químicos",
    peso: "3.8 Tn",
    destino: "Laboratorio Central",
    vehiculoId: defaultVehiculos[0].id,
    administradorId: defaultAdmins[1].id,
    estadoActual: "Despachado",
  },
  {
    id: 2,
    nombre: "Paneles solares",
    peso: "1.1 Tn",
    destino: "Parque Tecnológico",
    vehiculoId: defaultVehiculos[2].id,
    administradorId: defaultAdmins[1].id,
    estadoActual: "En camino",
  },
];
