import { useState } from "react";
import Header from "../components/Header/Header";
import DropdownMenu from "../components/Dropdown/DropdownMenu";
import Footer from "../components/Footer";
import CreditosModulo from "../components/CreditosModulo";

function Nosotros() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarAuth={true}
      />
      {open && (
        <DropdownMenu open={open} mostrarAuth={true} mostrarNav={true} />
      )}

      <main className="flex-1 flex flex-col justify-center">
        <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 border-b border-slate-800">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ¿Qué es CargoLink?
          </h2>

          <p className="text-slate-300 max-w-3xl leading-relaxed">
            CargoLink es una plataforma pensada para simplificar la gestión
            logística de empresas y conductores. Permite crear rutas, asignar
            vehículos y seguir pedidos en tiempo real con una interfaz limpia y
            eficiente. Nuestro foco es la simplicidad y la observabilidad para
            operaciones diarias.
          </p>
        </section>

        <section className="mw-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-semibold mb-4 text-center">Créditos</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CreditosModulo
              nombre={"Carlos Bello"}
              rol={"Front-end y Diseño"}
              enlace={"https://github.com/carlosb-dev"}
            />

            <CreditosModulo
              nombre={"Jorge Casco"}
              rol={"Middleware y API REST"}
              enlace={"https://github.com/jorge-link"}
            />

            <CreditosModulo
              nombre={"Francisco García"}
              rol={"Back-end y Base de Datos"}
              enlace={"https://github.com/SirFrancis2007"}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Nosotros;
