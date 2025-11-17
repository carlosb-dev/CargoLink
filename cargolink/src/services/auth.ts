import { apiURL } from "../data/apiData";
import { type EmpresaData } from "../utils/cookies";

type ApiResult<T> = {
  success: boolean;
  message?: string;
  data?: T;
  status: number;
  rawBody: unknown;
};

async function parseJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

// ----------------------------------------
// CREAR EMPRESA
// ----------------------------------------

export type CrearEmpresaPayload = {
  Nombre: string;
  Contrasena: string;
  Direccion: string;
  Email: string;
};

export async function crearEmpresa(
  payload: CrearEmpresaPayload
): Promise<ApiResult<unknown>> {
  const res = await fetch(`${apiURL}/empresa/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await parseJson(res);

  return {
    success: res.status === 201,
    message: body?.message,
    data: body,
    status: res.status,
    rawBody: body,
  };
}

// ----------------------------------------
// LOGIN EMPRESA
// ----------------------------------------

export type LoginPayload = {
  Email: string;
  Contrasena: string;
};

export type LoginData = {
  success?: boolean;
  message?: string;
  data?: EmpresaData;
};

export async function loginEmpresa(
  payload: LoginPayload
): Promise<ApiResult<LoginData>> {
  const res = await fetch(`${apiURL}/empresa/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await parseJson(res)) as LoginData;

  return {
    success: res.status === 200,
    message: body?.message,
    data: body,
    status: res.status,
    rawBody: body,
  };
}
