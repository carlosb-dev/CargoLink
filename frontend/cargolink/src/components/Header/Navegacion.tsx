import { Link } from "react-router-dom";

function Navegacion() {
  return (
    <nav className="hidden md:flex gap-6 text-slate-300">
      <Link className="hover:text-white transition" to="/conductores">
        Conductores
      </Link>
      <Link className="hover:text-white transition" to="/admin">
        Administradores
      </Link>
    </nav>
  );
}

export default Navegacion;
