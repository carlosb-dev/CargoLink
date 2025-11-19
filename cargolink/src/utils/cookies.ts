export type EmpresaData = {
  idEmpresa: number;
  Nombre: string;
  Direccion: string;
  Email: string;
};

const USER_COOKIE_NAME = "usuarioActual";

export function getStoredUserFromCookie(): EmpresaData | null {
  if (typeof document === "undefined") return null;
  const cookieEntry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${USER_COOKIE_NAME}=`));

  if (!cookieEntry) return null;
  const [, rawValue] = cookieEntry.split("=");
  if (!rawValue) return null;

  try {
    return JSON.parse(decodeURIComponent(rawValue));
  } catch {
    return null;
  }
}

export function persistUserCookie(user: EmpresaData) {
  const maxAgeSeconds = 60 * 60 * 24; // 1 dia
  document.cookie = `${USER_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(user)
  )}; path=/; max-age=${maxAgeSeconds}`;
}

export function clearUserCookie() {
  document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0`;
}
