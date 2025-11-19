import { useCallback, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaAdmin from "../../components/Empresa/ModalCreaAdmin";
import type { FormValues } from "../../components/Empresa/ModalCreaAdmin";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { getStoredUserFromCookie } from "../../utils/cookies";
import {
  createAdministrador,
  eliminarAdministrador,
  type CreateAdministradorPayload,
} from "../../utils/empresa";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import useAdministradores from "../../hooks/useAdministradores";

function Administradores() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const {
    administradores,
    isLoading,
    refetch,
    setAdministradores,
  } = useAdministradores();

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombre", label: "Nombre" },
      { key: "email", label: "Email" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const handleDelete = useCallback(
    async (idAdministrador?: number) => {
      if (typeof idAdministrador !== "number") {
        window.alert("No se pudo identificar el administrador a eliminar.");
        return;
      }

      const result = await eliminarAdministrador(idAdministrador);

      if (!result.success) {
        window.alert(
          result.message ?? "No se pudo eliminar el administrador."
        );
        return;
      }

      setAdministradores((prev) =>
        prev.filter((admin) => admin.idAdministrador !== idAdministrador)
      );
    },
    [setAdministradores]
  );

  const rows = useMemo(
    () =>
      administradores.map((a) => ({
        id: a.idAdministrador ?? "NA",
        nombre: a.Nombre ?? "NA",
        email: a.Email ?? "NA",
        acciones: (
          <button
            onClick={() => void handleDelete(a.idAdministrador)}
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950"
          >
            Eliminar
          </button>
        ),
      })),
    [administradores, handleDelete]
  );

  const hasAdministradores = rows.length > 0;

  async function handleCreate(data: FormValues): Promise<boolean> {
    if (!empresaId || isCreating) {
      if (!empresaId) {
        window.alert("No se pudo identificar la empresa actual.");
      }
      return false;
    }

    setIsCreating(true);

    const payload: CreateAdministradorPayload = {
      Nombre: data.Nombre.trim(),
      Contrasena: data.Contrasena,
      Email: data.Email.trim(),
      idEmpresa: empresaId,
    };

    try {
      await createAdministrador(payload);
      await refetch();
      setIsModalOpen(false);
      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo crear el administrador";
      window.alert(message);
      return false;
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
                Administradores
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Agregar admin
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Lista</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-slate-400">
                  Cargando administradores...
                </p>
              ) : hasAdministradores ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <EmptyStateCard
                  title="No hay administradores"
                  description="No se encontraron administradores para esta empresa."
                  buttonLabel="Agregar admin"
                  onButtonClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCreaAdmin
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Administradores;
