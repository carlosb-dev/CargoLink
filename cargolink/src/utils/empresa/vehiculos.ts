import { apiURL } from "../../data/apiData";

// -------------------------------
//    TIPOS
// -------------------------------

export type Vehiculo = {
  idVehiculo?: number;
  Matricula: string;
  Tipo: string;
  Modelo: string;
  Cantidad_paquetes: number;
  Capacidad: number;
  idEmpresa: number;
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

export type EliminarVehiculoResult = {
  success: boolean;
  message?: string;
};

// -------------------------------
//    GET
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

  const raw = await response.json();

  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.vehiculos)
    ? raw.vehiculos
    : raw
    ? [raw]
    : [];

  console.log("Vehiculos obtenidos:", list);
  return list;
}

// -------------------------------
//    POST
// -------------------------------

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

// -------------------------------
//    DELETE
// -------------------------------

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
