import { apiURL } from "../data/apiData";

export interface Conductor {
  id?: number;
  nombre: string;
  estado: string;
  licencia: string;
  email?: string;
}

export interface Vehiculo {
  id?: number;
  placa: string;
  modelo: string;
  estado: string;
}

export interface HistorialPedido {
  id?: number;
  tipo: string;
  conductor: string;
  matricula: string;
  estadoAnterior: string;
  estadoActual: string;
  fechaModificacion: string;
  nombrePedido: string;
  destino: string;
}

export interface Administrador {
  idAdministrador?: number;
  Nombre: string;
  Email: string;
}

export interface CreateAdministradorPayload {
  Nombre: string;
  Contrasena: string;
  Email: string;
  idEmpresa: number;
}

export const CONDUCTOR_ESTADO_OPTIONS = [
  { value: 1, label: "Activo" },
  { value: 2, label: "En Ruta" },
  { value: 0, label: "De Baja" },
] as const;

type ConductorEstadoValue = (typeof CONDUCTOR_ESTADO_OPTIONS)[number]["value"];

const estadoLabelByValue: Record<ConductorEstadoValue, string> = {
  0: "De Baja",
  1: "Activo",
  2: "En Ruta",
};

export function getConductorEstadoLabel(value: number | string): string {
  if (typeof value === "number") {
    return estadoLabelByValue[value as ConductorEstadoValue] ?? "Sin estado";
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return (
        estadoLabelByValue[numeric as ConductorEstadoValue] ??
        value ??
        "Sin estado"
      );
    }
    return value;
  }

  return "Sin estado";
}

export type CrearConductorPayload = {
  Nombre: string;
  Licencia: string;
  Estado: ConductorEstadoValue;
  Email: string;
  idEmpresa: number;
};

export type CrearConductorResult = {
  success: boolean;
  message?: string;
  conductor?: Conductor;
};

export async function fetchConductores(
  idEmpresa: number
): Promise<Conductor[]> {
  const response = await fetch(`${apiURL}/empresa/${idEmpresa}/conductores`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener conductores: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as
    | Conductor[]
    | {
        conductores?: Conductor[];
      };

  const list = Array.isArray(data) ? data : data?.conductores;
  return Array.isArray(list) ? list : [];
}

export async function crearConductor(
  payload: CrearConductorPayload
): Promise<CrearConductorResult> {
  const response = await fetch(`${apiURL}/empresa/conductor/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await response
    .json()
    .catch(() => null)) as {
    message?: string;
    conductor?: Conductor;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message:
        body?.message ??
        `No se pudo crear el conductor (${response.status})`,
    };
  }

  return {
    success: true,
    message: body?.message,
    conductor: body?.conductor,
  };
}

export async function fetchVehiculos(
  idEmpresa: number
): Promise<Vehiculo[]> {
  const response = await fetch(`${apiURL}/empresa/${idEmpresa}/vehiculos`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener vehiculos: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as
    | Vehiculo[]
    | {
        vehiculos?: Vehiculo[];
      };

  const list = Array.isArray(data) ? data : data?.vehiculos;
  return Array.isArray(list) ? list : [];
}

export async function fetchHistorialPedidos(
  idEmpresa: number
): Promise<HistorialPedido[]> {
  const response = await fetch(`${apiURL}/empresa/${idEmpresa}/pedidos`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener el historial: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as
    | HistorialPedido[]
    | {
        pedidos?: HistorialPedido[];
        historial?: HistorialPedido[];
        data?: HistorialPedido[];
      };

  const list = Array.isArray(data)
    ? data
    : data?.pedidos ?? data?.historial ?? data?.data;

  return Array.isArray(list) ? list : [];
}

export async function createAdministrador(
  payload: CreateAdministradorPayload
): Promise<Administrador> {
  const response = await fetch(`${apiURL}/administrador/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response
    .json()
    .catch(() => ({}))) as
    | Administrador
    | {
        administrador?: Administrador;
        message?: string;
      };

  if (!response.ok) {
    const message =
      (data as { message?: string })?.message ??
      `Error al crear administrador: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return (
    (data as { administrador?: Administrador })?.administrador ??
    (data as Administrador)
  );
}
