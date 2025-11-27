import { Link } from "react-router-dom";
import { RUTAS } from "../../data/rutas";

function AccesoDenegado() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 px-6">
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl shadow-2xl max-w-xl w-full p-10 text-center space-y-4">
        <div className="text-sm font-semibold tracking-wide text-cyan-300">
          Acceso restringido
        </div>
        <h1 className="text-3xl font-extrabold">¡Necesitas iniciar sesión!</h1>
        <p className="text-slate-300 leading-relaxed">
          Registrate o inicia sesión para acceder <br /> a las funcionalidades
          de CargoLink.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to={RUTAS.LOGIN}
            className="px-4 py-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold hover:scale-105 transition-transform duration-100"
          >
            Ir a Login
          </Link>
          <Link
            to={RUTAS.HOME}
            className="px-4 py-2 rounded-lg border border-slate-700 text-slate-100 hover:bg-slate-800 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccesoDenegado;
