import { Link } from "react-router-dom";
import { RUTAS } from "../rutas";

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} CargoLink
        </div>

        <div className="flex gap-4 text-slate-300">
          <Link to={RUTAS.NOSOTROS} className="hover:text-white transition">
            Nosotros
          </Link>
          <Link to={RUTAS.CONTACTO} className="hover:text-white transition">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
