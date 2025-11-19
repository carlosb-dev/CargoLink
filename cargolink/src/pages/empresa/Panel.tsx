import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { defaultAdmins } from "../../data/empresaTablas";
import { getStoredUserFromCookie } from "../../utils/cookies";
import { fetchConductores, fetchVehiculos, getConductorEstadoLabel } from "../../utils/empresa";
import type { Conductor, Vehiculo } from "../../utils/empresa";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";

// Variables de Ejemplo

const administradores = defaultAdmins.map(({ nombre, email }) => ({
  nombre,
  email,
}));

function Empresa() {
  const [open, setOpen] = useState(false);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isConductoresLoading, setIsConductoresLoading] = useState(true);
  const [isVehiculosLoading, setIsVehiculosLoading] = useState(true);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const empresaNombre = storedUser?.Nombre ?? "EmpresaTest";

  useEffect(() => {
    if (!empresaId) {
      setConductores([]);
      setVehiculos([]);
      setIsConductoresLoading(false);
      setIsVehiculosLoading(false);
      return;
    }

    let active = true;
    setIsConductoresLoading(true);
    setIsVehiculosLoading(true);

    fetchConductores(empresaId)
      .then((data) => {
        if (active) {
          setConductores(data);
        }
      })
      .catch(() => {
        if (active) {
          setConductores([]);
        }
      })
      .finally(() => {
        if (active) {
          setIsConductoresLoading(false);
        }
      });

    fetchVehiculos(empresaId)
      .then((data) => {
        if (active) {
          setVehiculos(data);
        }
      })
      .catch(() => {
        if (active) {
          setVehiculos([]);
        }
      })
      .finally(() => {
        if (active) {
          setIsVehiculosLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [empresaId]);

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
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Contenido principal */}
          <section className="space-y-6">
            <div className="flex justify-between flex-row bg-slate-900/60 border border-slate-800 rounded-lg p-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {empresaNombre}.
                </h1>
                <p className="text-slate-300 mt-1">Resumen de la empresa.</p>
              </div>
              <div>
                {storedUser && (
                  <div className="text-sm text-slate-300 mt-3 space-y-1">
                    <p>Email: {storedUser.Email}</p>
                    <p>Direccion: {storedUser.Direccion}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Conductores */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-lg font-semibold">Conductores</h3>
                </div>
                <div className="p-4 overflow-x-auto overflow-y-auto max-h-64">
                  {isConductoresLoading ? (
                    <p className="text-sm text-slate-400">
                      Cargando conductores...
                    </p>
                  ) : conductores.length > 0 ? (
                    <Tabla
                      columns={[
                        { key: "Nombre", label: "Nombre" },
                        { key: "Estado", label: "Estado" },
                        { key: "Licencia", label: "Licencia" },
                      ]}
                      rows={conductores.map((c) => ({
                        Nombre: c.Nombre ?? "NA",
                        Estado: getConductorEstadoLabel(c.Estado ?? ""),
                        Licencia: c.Licencia ?? "NA",
                      }))}
                    />
                  ) : (
                    <EmptyStateCard
                      title="No hay conductores"
                      description="No hay conductores cargados para esta empresa."
                      buttonLabel="Agregar conductor"
                      href="/empresa/conductores"
                    />
                  )}
                </div>
              </div>

              {/* Administradores */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-lg font-semibold">Administradores</h3>
                </div>
                <div className="p-4 overflow-x-auto overflow-y-auto max-h-64">
                  <Tabla
                    columns={[
                      { key: "nombre", label: "Nombre" },
                      { key: "email", label: "Email" },
                    ]}
                    rows={administradores}
                  />
                </div>
              </div>

              {/* Vehiculos */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-lg font-semibold">Vehiculos</h3>
                </div>
                <div className="p-4 overflow-x-auto overflow-y-auto max-h-64">
                  {isVehiculosLoading ? (
                    <p className="text-sm text-slate-400">
                      Cargando vehículos...
                    </p>
                  ) : vehiculos.length > 0 ? (
                    <Tabla
                      columns={[
                        { key: "placa", label: "Placa" },
                        { key: "modelo", label: "Modelo" },
                        { key: "estado", label: "Estado" },
                      ]}
                      rows={vehiculos}
                    />
                  ) : (
                    <EmptyStateCard
                      title="No hay vehiculos"
                      description="No hay vehiculos cargados para esta empresa."
                      buttonLabel="Agregar vehiculo"
                      href="/empresa/vehiculos"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Empresa;
