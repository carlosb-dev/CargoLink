import { Link } from "react-router-dom";

function AuthBotones() {
  return (
    <div className="hidden md:flex gap-3">
      <Link
        to="/login"
        className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800 transition cursor-pointer"
      >
        Iniciá sesión
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-md font-medium shadow hover:scale-[1.02] transition cursor-pointer"
      >
        Registrá tu empresa
      </Link>
    </div>
  );
}

export default AuthBotones;
