import { apiURL } from "../../data/apiData";

// -------------------------------
//    TIPOS
// -------------------------------

export type FlotaAsignacion = {
  id: number;
  conductorId: number;
  vehiculoId: number;
};

export type CrearVinculoPayload = {
  idVehiculo: number;
  idConductor: number;
};

export type CrearVinculoResult = {
  success: boolean;
  message?: string;
};

export type EliminarVinculoPayload = {
  idVehiculo: number;
  idConductor: number;
};

export type EliminarVinculoResult = {
  success: boolean;
  message?: string;
};

type RawFlotaResponse = {
  asignaciones?: unknown[];
  Vinculos?: unknown[];
  vinculos?: unknown[];
  relaciones?: unknown[];
  data?: unknown[];
};

type RawFlotaItem = Record<string, unknown>;

// -------------------------------
//    GET
// -------------------------------

export async function fetchVinculos(
  idEmpresa: number
): Promise<FlotaAsignacion[]> {
  const response = await fetch(
    `${apiURL}/empresa/vehiculo-conductor/${idEmpresa}`
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

// -------------------------------
//    POST
// -------------------------------

export async function crearVinculo(
  payload: CrearVinculoPayload
): Promise<CrearVinculoResult> {
  const response = await fetch(`${apiURL}/empresa/vincular`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log(payload);

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    success?: boolean;
  } | null;

  if (!response.ok) {
    return {
      success: false,
      message:
        body?.message ??
        `No se pudo crear la vinculacion (${response.status})`,
    };
  }

  return {
    success: body?.success ?? true,
    message: body?.message,
  };
}

// -------------------------------
//    DELETE
// -------------------------------

export async function eliminarVinculo(
  payload: EliminarVinculoPayload
): Promise<EliminarVinculoResult> {
  const response = await fetch(
    `${apiURL}/empresa/vehiculo-conductor/eliminar/${payload.idVehiculo}/${payload.idConductor}`,
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
      message:
        body?.message ??
        `No se pudo eliminar la vinculacion (${response.status})`,
    };
  }

  return {
    success: body?.success ?? true,
    message: body?.message,
  };
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
