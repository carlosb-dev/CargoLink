import { useState } from "react";
import Header from "../../components/Header/Header";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Footer from "../../components/Footer";
import CreditosModulo from "../../components/CreditosModulo";

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

          <div className="flex flex-col gap-6">
            <p className="text-slate-300 max-w-3xl leading-relaxed">
              CargoLink es la plataforma web que centraliza la operación
              logística de tu empresa. Desde una misma página puedes registrar
              administradores, dar de alta conductores, vehículos y vincularlos
              entre sícon un flujo simple en segundos.
            </p>

            <p className="text-slate-300 max-w-3xl leading-relaxed">
              Todo el diseño está pensado para la supervisión diaria: tablas
              claras para crear, editar o eliminar registros, asignación ágil
              entre conductores y vehículos, y estados visibles al instante
              para saber quién está disponible. Menos clics, más control de tu operación.
            </p>
          </div>
        </section>

        <section className="mw-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-semibold mb-4 text-center">Créditos</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <CreditosModulo
              nombre={"Carlos Bello"}
              rol={"Front-end/UX"}
              enlace={"https://github.com/carlosb-dev"}
              linkText={"Ir al Perfil "}
            />

            <CreditosModulo
              nombre={"Jorge Casco"}
              rol={"Backend/API"}
              enlace={"https://github.com/jorge-link"}
              linkText={"Ir al Perfil"}
            />

            <CreditosModulo
              nombre={"Francisco García"}
              rol={"Datos/DB"}
              enlace={"https://github.com/SirFrancis2007"}
              linkText={"Ir al Perfil"}
            />

            <CreditosModulo
              nombre={"GitHub"}
              rol={"Repo del Proyecto"}
              enlace={"https://github.com/carlosb-dev/CargoLink"}
              linkText={"Ir al Repo"}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Nosotros;
