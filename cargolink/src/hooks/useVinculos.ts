import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getStoredUserFromCookie } from "../utils/cookies";
import { fetchVinculos, type FlotaAsignacion } from "../utils/empresa";

type UseVinculosResult = {
  asignaciones: FlotaAsignacion[];
  isLoading: boolean;
  refetch: () => Promise<void>;
  setAsignaciones: Dispatch<SetStateAction<FlotaAsignacion[]>>;
};

export default function useVinculos(): UseVinculosResult {
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const [asignaciones, setAsignaciones] = useState<FlotaAsignacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAsignaciones = useCallback(async () => {
    if (!empresaId) {
      setAsignaciones([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetchVinculos(empresaId);
      setAsignaciones(data);
    } catch {
      setAsignaciones([]);
    } finally {
      setIsLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void loadAsignaciones();
  }, [loadAsignaciones]);

  return {
    asignaciones,
    isLoading,
    refetch: loadAsignaciones,
    setAsignaciones,
  };
}
