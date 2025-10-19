import { Link } from "react-router-dom";
import { RUTAS } from "../../rutas";

type Props = {
  mostrar?: boolean;
};

function AuthBotones({ mostrar = false }: Props) {
  return (
    mostrar && (
      <div className=" hidden [@media(min-width:950px)]:inline-flex gap-3">
        <Link
          to={RUTAS.EMPRESALOGIN}
          className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 text-center hover:bg-slate-800 transition cursor-pointer"
        >
          Iniciá sesión
        </Link>
        <Link
          to={RUTAS.EMPRESASIGNUP}
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-center rounded-md font-medium shadow hover:scale-[1.02] transition cursor-pointer"
        >
          Registrá tu empresa
        </Link>
      </div>
    )
  );
}

export default AuthBotones;
