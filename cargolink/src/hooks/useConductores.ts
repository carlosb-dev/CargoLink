import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getStoredUserFromCookie } from "../utils/cookies";
import { fetchConductores, type Conductor } from "../utils/empresa";

type UseConductoresResult = {
  conductores: Conductor[];
  isLoading: boolean;
  refetch: () => Promise<void>;
  setConductores: Dispatch<SetStateAction<Conductor[]>>;
};

export default function useConductores(): UseConductoresResult {
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadConductores = useCallback(async () => {
    if (!empresaId) {
      setConductores([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetchConductores(empresaId);
      setConductores(data);
    } catch {
      setConductores([]);
    } finally {
      setIsLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void loadConductores();
  }, [loadConductores]);

  return {
    conductores,
    isLoading,
    refetch: loadConductores,
    setConductores,
  };
}
