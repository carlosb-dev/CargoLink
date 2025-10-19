import { Link } from "react-router-dom";
import { RUTAS } from "../../rutas";
import Navegacion from "../Header/Navegacion";

type Props = {
  open?: boolean;
  mostrarAuth?: boolean;
  mostrarNav?: boolean;
};

function DropdownMenu({
  open = false,
  mostrarAuth = false,
  mostrarNav = false,
}: Props) {
  return (
    <div
      className={`bg-red border-t border-slate-800
        ${open ? "block lg:hidden" : "hidden"}
        `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
        {mostrarNav && (
          <Navegacion />
        )}

        {mostrarAuth && (
          <div className="flex flex-col gap-3">
            <Link
              className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 text-center hover:bg-slate-800 transition cursor-pointer"
              to={RUTAS.LOGIN}
            >
              Iniciá sesión
            </Link>
            <Link
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-center rounded-md font-medium shadow hover:scale-[1.02] transition cursor-pointer"
              to={RUTAS.EMPRESASIGNUP}
            >
              Registrá tu empresa
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
