import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import SidebarPanel from "../../components/Empresa/SidebarPanel";
import Tabla from "../../components/Empresa/Tabla";

// Variables de Ejemplo

  const empresaNombre = "EmpresaTest";

  const conductores = [
    { nombre: "Juan Pérez", estado: "Activo", telefono: "+54 11 5555-1111" },
    { nombre: "María Gómez", estado: "De Baja", telefono: "+54 11 5555-2222" },
    { nombre: "Luis Rodríguez", estado: "En Ruta", telefono: "+54 11 5555-3333" },
  ];

  const administradores = [
    { nombre: "Sofía Díaz", rol: "Administrador", email: "sofia@email.com" },
    { nombre: "Pedro Ruiz", rol: "Supervisor", email: "pedro@email.com" },
  ];

  const vehiculos = [
    { placa: "AB-123-CD", modelo: "Volvo FH", estado: "En camino" },
    { placa: "EF-456-GH", modelo: "Scania R500", estado: "Despachado" },
    { placa: "IJ-789-KL", modelo: "Iveco S-Way", estado: "Recibido" },
  ];

function Empresa() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col pl-64">
      <SidebarPanel />

      <Header open={open} setOpen={setOpen} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Contenido principal */}
          <section className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Bienvenido, {empresaNombre}.
              </h1>
              <p className="text-slate-300 mt-1">Resumen de la empresa.</p>
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
                      { key: "telefono", label: "Teléfono" },
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
                      { key: "rol", label: "Rol" },
                      { key: "email", label: "Email" },
                    ]}
                    rows={administradores}
                  />
                </div>
              </div>

              {/* Vehículos */}
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
