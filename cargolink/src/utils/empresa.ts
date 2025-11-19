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
};

export type Vehiculo = {
  idVehiculo?: number;
  Matricula: string;
  Tipo: string;
  Modelo: string;
  Cantidad_paquetes: number;
  Capacidad: number;
  idEmpresa: number;
};

export type FlotaAsignacion = {
  id: number;
  conductorId: number;
  vehiculoId: number;
};

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
};

export type Administrador = {
  idAdministrador?: number;
  Nombre: string;
  Email: string;
};

export type CreateAdministradorPayload = {
  Nombre: string;
  Contrasena: string;
  Email: string;
  idEmpresa: number;
};

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

export type EliminarAdministradorResult = {
  success: boolean;
  message?: string;
};

export type EliminarVehiculoResult = {
  success: boolean;
  message?: string;
};

export type CrearVehiculoPayload = {
  Matricula: string;
  Tipo: string;
  Modelo: string;
  Cantidad_paquetes: number;
  Capacidad: number;
  idEmpresa: number;
};

export type CrearVehiculoResult = {
  success: boolean;
  message?: string;
  vehiculo?: Vehiculo;
};

export const CONDUCTOR_ESTADO_OPTIONS = [
  { value: 1, label: "Activo" },
  { value: 2, label: "De baja" },
  { value: 0, label: "En Ruta" },
] as const;

const estadoLabelByValue = Object.fromEntries(
  CONDUCTOR_ESTADO_OPTIONS.map((option) => [option.value, option.label])
) as Record<ConductorEstadoValue, string>;
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

// Buscar Concutores de una empresa

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

// Crear Conductor

export async function crearConductor(
  payload: CrearConductorPayload
): Promise<CrearConductorResult> {
  const response = await fetch(`${apiURL}/empresa/conductor/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    conductor?: Conductor;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message:
        body?.message ?? `No se pudo crear el conductor (${response.status})`,
    };
  }

  return {
    success: true,
    message: body?.message,
    conductor: body?.conductor,
  };
}

// Eliminar Conductor

export async function eliminarConductor(
  idConductor: number
): Promise<EliminarConductorResult> {
  const response = await fetch(
    `${apiURL}/empresa/conductor/eliminar/${idConductor}`,
    {
      method: "DELETE",
    }
  );

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    success?: boolean;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message: `No se pudo eliminar el conductor id:${idConductor} (${response.status})\nbody.message: ${body?.message}`,
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

// Buscar Vehiculos de una empresa

export async function fetchVehiculos(idEmpresa: number): Promise<Vehiculo[]> {
  const response = await fetch(`${apiURL}/empresa/${idEmpresa}/vehiculos`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener vehiculos: ${response.status} ${response.statusText}`
    );
  }

  const raw = await response.json();

  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.vehiculos)
    ? raw.vehiculos
    : raw
    ? [raw] // convierte un objeto a arreglo de un solo elemento
    : [];

  console.log("Vehiculos obtenidos:", list);
  return list;
}

// -------------------------------
//    FLOTA ASIGNACIONES
// -------------------------------

type RawFlotaResponse = {
  asignaciones?: unknown[];
  Vinculos?: unknown[];
  vinculos?: unknown[];
  relaciones?: unknown[];
  data?: unknown[];
};

type RawFlotaItem = Record<string, unknown>;

export async function fetchVinculos(
  idEmpresa: number
): Promise<FlotaAsignacion[]> {
  const response = await fetch(
    `${apiURL}/empresa/${idEmpresa}/flota-asignaciones`
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener las asignaciones de flota: ${response.status} ${response.statusText}`
    );
  }

  const raw = (await response.json()) as unknown;
  const rawObject = raw as RawFlotaResponse;

  const list: unknown[] = Array.isArray(raw)
    ? raw
    : Array.isArray(rawObject.asignaciones)
    ? rawObject.asignaciones
    : Array.isArray(rawObject.Vinculos)
    ? rawObject.Vinculos
    : Array.isArray(rawObject.vinculos)
    ? rawObject.vinculos
    : Array.isArray(rawObject.relaciones)
    ? rawObject.relaciones
    : Array.isArray(rawObject.data)
    ? rawObject.data
    : [];

  const entries = list.filter(
    (item): item is RawFlotaItem => typeof item === "object" && item !== null
  );

  const asignaciones = entries
    .map((item, index) => {
      const conductorId =
        getNumericValue(item["conductorId"]) ??
        getNumericValue(item["idConductor"]) ??
        getNumericValueFromNested(item["conductor"], ["idConductor", "id"]);

      const vehiculoId =
        getNumericValue(item["vehiculoId"]) ??
        getNumericValue(item["idVehiculo"]) ??
        getNumericValueFromNested(item["vehiculo"], ["idVehiculo", "id"]);

      const id =
        getNumericValue(item["id"]) ??
        getNumericValue(item["idFlotaAsignacion"]) ??
        getNumericValue(item["flotaAsignacionId"]) ??
        getNumericValue(item["idRelacion"]) ??
        getNumericValue(item["idVinculo"]) ??
        index;

      if (conductorId === undefined || vehiculoId === undefined) {
        return null;
      }

      return {
        id,
        conductorId,
        vehiculoId,
      };
    })
    .filter((value): value is FlotaAsignacion => value !== null);

  console.log("Flota asignaciones obtenidas:", asignaciones);
  return asignaciones;
}

function getNumericValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }

  return undefined;
}

function getNumericValueFromNested(
  value: unknown,
  keys: string[]
): number | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  for (const key of keys) {
    const numeric = getNumericValue(record[key]);
    if (numeric !== undefined) {
      return numeric;
    }
  }

  return undefined;
}

// Crear Vehiculo

export async function crearVehiculo(
  payload: CrearVehiculoPayload
): Promise<CrearVehiculoResult> {
  const response = await fetch(`${apiURL}/empresa/vehiculo/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    vehiculo?: Vehiculo;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message:
        body?.message ?? `No se pudo crear el vehiculo (${response.status})`,
    };
  }

  return {
    success: true,
    message: body?.message,
    vehiculo: body?.vehiculo,
  };
}

// Eliminar Vehiculo

export async function eliminarVehiculo(
  idVehiculo: number
): Promise<EliminarVehiculoResult> {
  const response = await fetch(
    `${apiURL}/empresa/vehiculo/eliminar/${idVehiculo}`,
    {
      method: "DELETE",
    }
  );

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    success?: boolean;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message: `No se pudo eliminar el vehiculo id:${idVehiculo} (${response.status})\nbody.message: ${body?.message}`,
    };
  }

  return {
    success: body?.success ?? true,
    message: body?.message,
  };
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

export async function fetchAdministradores(
  idEmpresa: number
): Promise<Administrador[]> {
  const response = await fetch(
    `${apiURL}/empresa/${idEmpresa}/administradores`
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener administradores: ${response.status} ${response.statusText}`
    );
  }

  const raw = await response.json();

  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.administradores)
    ? raw.administradores
    : raw
    ? [raw] // convierte un objeto a arreglo de un solo elemento
    : [];

  console.log("Administradores obtenidos:", list);
  return list;
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

  const data = (await response.json().catch(() => ({}))) as
    | Administrador
    | {
        administrador?: Administrador;
        message?: string;
      };

  console.log("crear admin" + data);

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

export async function eliminarAdministrador(
  idAdministrador: number
): Promise<EliminarAdministradorResult> {
  const response = await fetch(
    `${apiURL}/empresa/administrador/eliminar/${idAdministrador}`,
    {
      method: "DELETE",
    }
  );

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    success?: boolean;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message: `No se pudo eliminar el administrador id:${idAdministrador} (${response.status})\nbody.message: ${body?.message}`,
    };
  }

  return {
    success: body?.success ?? true,
    message: body?.message,
  };
}
