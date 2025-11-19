import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getStoredUserFromCookie } from "../utils/cookies";
import { fetchAdministradores, type Administrador } from "../utils/empresa";

type UseAdministradoresResult = {
  administradores: Administrador[];
  isLoading: boolean;
  refetch: () => Promise<void>;
  setAdministradores: Dispatch<SetStateAction<Administrador[]>>;
};

export default function useAdministradores(): UseAdministradoresResult {
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAdministradores = useCallback(async () => {
    if (!empresaId) {
      setAdministradores([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetchAdministradores(empresaId);
      setAdministradores(data);
    } catch {
      setAdministradores([]);
    } finally {
      setIsLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void loadAdministradores();
  }, [loadAdministradores]);

  return {
    administradores,
    isLoading,
    refetch: loadAdministradores,
    setAdministradores,
  };
}
