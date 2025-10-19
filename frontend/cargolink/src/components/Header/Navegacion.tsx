import { Link } from "react-router-dom";
import { RUTAS } from "../../rutas";

type Props = {
  mostrar?: boolean;
};

function Navegacion({ mostrar = false }: Props) {
  return (
    mostrar && (
      <nav className="hidden [@media(min-width:950px)]:inline-flex gap-6 text-slate-300">
        <Link className="hover:text-white transition" to={RUTAS.CONDUCTORLOGIN}>
          Conductores
        </Link>
        <Link className="hover:text-white transition" to={RUTAS.ADMINLOGIN}>
          Administradores
        </Link>
      </nav>
    )
  );
}

export default Navegacion;
