import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { RUTAS } from "../../rutas";

function Logo() {
  return (
    <Link
      to={RUTAS.HOME}
      className="w-12 h-12 p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg"
    >
      <img src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
