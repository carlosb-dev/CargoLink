import { Link } from "react-router-dom";
import { RUTAS } from "../../data/rutas";

function Navegacion({ mostrar = false }: { mostrar?: boolean }) {
  return (
    <nav className={`${mostrar ? "block" : "hidden lg:flex"} gap-6 text-slate-300 `}>
      <Link className="hover:text-white transition" to={RUTAS.NOSOTROS}>
        Nosotros
      </Link>
    </nav>
  );
}

export default Navegacion;
