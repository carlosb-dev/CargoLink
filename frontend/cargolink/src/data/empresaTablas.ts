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
  { id: 0, placa: "AB-123-CD", modelo: "Volvo FH", estado: "En camino" },
  { id: 1, placa: "EF-456-GH", modelo: "Scania R500", estado: "Despachado" },
  { id: 2, placa: "IJ-789-KL", modelo: "Iveco S-Way", estado: "Recibido" },
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
