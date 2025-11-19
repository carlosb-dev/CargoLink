import { apiURL } from "../../data/apiData";

// -------------------------------
//    TIPOS
// -------------------------------

export type Conductor = {
  Email: string;
  Estado?: number;
  Licencia: string;
  Nombre: string;
  idConductor: number;
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
//    GET
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
    ? [raw]
    : [];

  console.log("Conductores obtenidos:", list);
  return list;
}

// -------------------------------
//    POST
// -------------------------------

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

// -------------------------------
//    DELETE
// -------------------------------

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
