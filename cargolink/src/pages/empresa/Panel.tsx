import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import {
  defaultAdmins,
  defaultConductores,
  defaultVehiculos,
} from "../../data/empresaTablas";
import { getStoredUserFromCookie } from "../../utils/cookies";

// Variables de Ejemplo

const conductores = defaultConductores.map(({ nombre, estado, licencia }) => ({
  nombre,
  estado,
  licencia,
}));

const administradores = defaultAdmins.map(({ nombre, email }) => ({
  nombre,
  email,
}));

const vehiculos = defaultVehiculos.map(({ placa, modelo }) => ({
  placa,
  modelo,
  estado: "Sin estado",
}));

function Empresa() {
  const [open, setOpen] = useState(false);
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
                    <p>Dirección: {storedUser.Direccion}</p>
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
                <div className="p-4 overflow-x-auto">
                  <Tabla
                    columns={[
                      { key: "nombre", label: "Nombre" },
                      { key: "estado", label: "Estado" },
                      { key: "licencia", label: "Licencia" },
                    ]}
                    rows={conductores}
                  />
                </div>
              </div>

              {/* Administradores */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-lg font-semibold">Administradores</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <Tabla
                    columns={[
                      { key: "nombre", label: "Nombre" },
                      { key: "email", label: "Email" },
                    ]}
                    rows={administradores}
                  />
                </div>
              </div>

              {/* Veh�culos */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-lg font-semibold">Vehículos</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <Tabla
                    columns={[
                      { key: "placa", label: "Placa" },
                      { key: "modelo", label: "Modelo" },
                      { key: "estado", label: "Estado" },
                    ]}
                    rows={vehiculos}
                  />
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
