import { apiURL } from "../../data/apiData";

// -------------------------------
//    TIPOS
// -------------------------------


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

export type EliminarAdministradorResult = {
  success: boolean;
  message?: string;
};

// -------------------------------
//    GET
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
    ? [raw]
    : [];

  console.log("Administradores obtenidos:", list);
  return list;
}

// -------------------------------
//    POST
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

  const data = (await response.json().catch(() => ({}))) as
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

// -------------------------------
//    DELETE
// -------------------------------

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
