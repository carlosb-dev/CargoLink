import { apiURL } from "../data/apiData";

  // -------------------------------
  //    TIPOS DE DATO
  // -------------------------------

export type Conductor = {
  Email: string;
  Estado?: number;
  Licencia: string;
  Nombre: string;
  idConductor: number;
  idEmpresa: number;
}

export type Vehiculo = {
  id?: number;
  placa: string;
  modelo: string;
  estado: string;
}

export type HistorialPedido = {
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

export type Administrador = {
  idAdministrador?: number;
  Nombre: string;
  Email: string;
}

export type CreateAdministradorPayload = {
  Nombre: string;
  Contrasena: string;
  Email: string;
  idEmpresa: number;
}

export type CrearConductorPayload = {
  Nombre: string;
  Licencia: string;
  Email: string;
  idEmpresa: number;
};

export type CrearConductorResult = {
  success: boolean;
  message?: string;
  conductor?: Conductor;
};

export type EliminarConductorResult = {
  success: boolean;
  message?: string;
};

export const CONDUCTOR_ESTADO_OPTIONS = [
  { value: 1, label: "Activo" },
  { value: 2, label: "En Ruta" },
  { value: 0, label: "De Baja" },
] as const;


const estadoLabelByValue: Record<ConductorEstadoValue, string> = {
  0: "De Baja",
  1: "Activo",
  2: "En Ruta",
};

type ConductorEstadoValue = (typeof CONDUCTOR_ESTADO_OPTIONS)[number]["value"];

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

  // -------------------------------
  //    CONDUCTORES
  // -------------------------------

export async function fetchConductores(
  idEmpresa: number
): Promise<Conductor[]> {
  const response = await fetch(`${apiURL}/empresa/${idEmpresa}/conductores`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener conductores: ${response.status} ${response.statusText}`
    );
  }

  const raw = await response.json();

  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.conductores)
      ? raw.conductores
      : raw
        ? [raw] // convierte un objeto a arreglo de un solo elemento
        : [];

  console.log("Conductores obtenidos:", list);
  return list;
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

export async function eliminarConductor(
  idConductor: number
): Promise<EliminarConductorResult> {
  const response = await fetch(
    `${apiURL}/empresa/conductor/eliminar/${idConductor}`,
    {
      method: "DELETE",
    }
  );

  const body = (await response
    .json()
    .catch(() => null)) as { message?: string; success?: boolean } | null;

  if (!response.ok) {
    return {
      success: false,
      message:
        body?.message ??
        `No se pudo eliminar el conductor (${response.status})`,
    };
  }

  return {
    success: body?.success ?? true,
    message: body?.message,
  };
}

// -------------------------------
//    VEHICULOS
// -------------------------------

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

// -------------------------------
//    HISTORIAL
// -------------------------------

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

// -------------------------------
//    ADMINISTRADORES
// -------------------------------

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
