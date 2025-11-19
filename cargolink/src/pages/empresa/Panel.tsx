import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { getStoredUserFromCookie } from "../../utils/cookies";
import { getConductorEstadoLabel } from "../../utils/empresa";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import useConductores from "../../hooks/useConductores";
import useVehiculos from "../../hooks/useVehiculos";
import useAdministradores from "../../hooks/useAdministradores";

function Empresa() {
  const [open, setOpen] = useState(false);
  const { vehiculos, isLoading: isVehiculosLoading } = useVehiculos();
  const { conductores, isLoading: isConductoresLoading } = useConductores();
  const { administradores, isLoading: isAdministradoresLoading } =
    useAdministradores();
  const storedUser = getStoredUserFromCookie();
  const empresaNombre = storedUser?.Nombre ?? "EmpresaTest";

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
                  {isAdministradoresLoading ? (
                    <p className="text-sm text-slate-400">
                      Cargando administradores...
                    </p>
                  ) : administradores.length > 0 ? (
                    <Tabla
                      columns={[
                        { key: "nombre", label: "Nombre" },
                        { key: "email", label: "Email" },
                      ]}
                      rows={administradores.map((admin) => ({
                        nombre: admin.Nombre ?? "NA",
                        email: admin.Email ?? "NA",
                      }))}
                    />
                  ) : (
                    <EmptyStateCard
                      title="No hay administradores"
                      description="No hay administradores cargados para esta empresa."
                      buttonLabel="Agregar admin"
                      href="/empresa/administradores"
                    />
                  )}
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
                        { key: "matricula", label: "Matricula" },
                        { key: "modelo", label: "Modelo" },
                        { key: "tipo", label: "Tipo" },
                      ]}
                      rows={vehiculos.map((vehiculo) => ({
                        matricula: vehiculo.Matricula ?? "NA",
                        modelo: vehiculo.Modelo ?? "NA",
                        tipo: vehiculo.Tipo ?? "NA",
                      }))}
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
