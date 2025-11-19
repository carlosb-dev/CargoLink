import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getStoredUserFromCookie } from "../utils/cookies";
import { fetchVehiculos, type Vehiculo } from "../utils/empresa";

type UseVehiculosResult = {
  vehiculos: Vehiculo[];
  isLoading: boolean;
  refetch: () => Promise<void>;
  setVehiculos: Dispatch<SetStateAction<Vehiculo[]>>;
};

export default function useVehiculos(): UseVehiculosResult {
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadVehiculos = useCallback(async () => {
    if (!empresaId) {
      setVehiculos([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetchVehiculos(empresaId);
      setVehiculos(data);
    } catch {
      setVehiculos([]);
    } finally {
      setIsLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void loadVehiculos();
  }, [loadVehiculos]);

  return {
    vehiculos,
    isLoading,
    refetch: loadVehiculos,
    setVehiculos,
  };
}
