import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RUTAS } from "../data/rutas";
import { getStoredUserFromCookie } from "../utils/cookies";

export function useAuthRedirect() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const storedUser = getStoredUserFromCookie();

    if (!storedUser && pathname.startsWith("/Empresa")) {
      console.log(pathname);
      navigate(RUTAS.ACCESO_DENEGADO, { replace: true });
    }
  }, [navigate, pathname]);
}
