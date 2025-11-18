import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaConductor from "../../components/Empresa/ModalCreaConductor";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import type { FormValues } from "../../components/Empresa/ModalCreaConductor";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { getStoredUserFromCookie } from "../../utils/cookies";
import {
  crearConductor,
  fetchConductores,
  getConductorEstadoLabel,
  type Conductor,
  type CrearConductorPayload,
} from "../../utils/empresa";

function getNextConductorId(list: Conductor[]): number {
  if (list.length === 0) {
    return 1;
  }

  return (
    Math.max(...list.map((c) => (typeof c.id === "number" ? c.id : 0))) + 1
  );
}

function Conductores() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;

  useEffect(() => {
    if (!empresaId) {
      setConductores([]);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    fetchConductores(empresaId)
      .then((data) => {
        if (!isActive) return;
        setConductores(data);
      })
      .catch(() => {
        if (!isActive) return;
        setConductores([]);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [empresaId]);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombre", label: "Nombre" },
      { key: "estado", label: "Estado" },
      { key: "licencia", label: "Licencia" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      conductores.map((c, index) => {
        const rowId =
          typeof c.id === "number" ? c.id : index + 1;

        return {
          id: rowId,
          nombre: c.nombre ?? "",
          estado: c.estado ?? "Sin estado",
          licencia: c.licencia ?? "",
          acciones: (
            <button
              onClick={() => handleDelete(rowId)}
              className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950"
            >
              Eliminar
            </button>
          ),
        };
      }),
    [conductores]
  );

  const hasConductores = rows.length > 0;

  // Luego cambiar por DELETE en API
  function handleDelete(id: number) {
    setConductores((prev) => prev.filter((x) => x.id !== id));
  }

  // Luego cambiar por POST en API
  async function handleCreate(data: FormValues): Promise<boolean> {
    if (!empresaId || isCreating) {
      if (!empresaId) {
        window.alert("No se pudo identificar la empresa actual.");
      }
      return false;
    }

    setIsCreating(true);

    const payload: CrearConductorPayload = {
      Nombre: data.Nombre.trim(),
      Licencia: data.Licencia.trim(),
      Estado: data.Estado,
      Email: data.Email.trim(),
      idEmpresa: empresaId,
    };

    try {
      const result = await crearConductor(payload);

      if (!result.success) {
        window.alert(result.message ?? "No se pudo crear el conductor");
        return false;
      }

      const conductorFromApi = result.conductor;

      setConductores((prev) => {
        if (conductorFromApi) {
          return [...prev, conductorFromApi];
        }

        return [
          ...prev,
          {
            id: getNextConductorId(prev),
            nombre: payload.Nombre,
            estado: getConductorEstadoLabel(payload.Estado),
            licencia: payload.Licencia,
            email: payload.Email,
          },
        ];
      });

      setIsModalOpen(false);
      return true;
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarNav={true}
        items={EMPRESA_NAV_ITEMS}
      />

      <DropdownMenu open={open} mostrarNav={true} items={EMPRESA_NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Conductores
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Agregar conductor
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Lista</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-slate-400">
                  Cargando conductores...
                </p>
              ) : hasConductores ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <EmptyStateCard
                  title="No hay conductores"
                  description="No se encontraron conductores para esta empresa."
                  buttonLabel="Agregar conductor"
                  onButtonClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCreaConductor
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Conductores;
