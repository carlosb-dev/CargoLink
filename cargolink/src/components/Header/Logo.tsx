import { Link } from "react-router-dom";
import { RUTAS } from "../../data/rutas";
import logo from "../../assets/logo.png";

function Logo() {
  return (
    <Link
      to={RUTAS.HOME}
      className="w-14 h-14 p-2.5 rounded-[50%]
                 bg-gradient-to-br from-cyan-400 to-blue-600
                 flex items-center justify-center
                 shadow-lg
                 hover:rotate-360 transition-all duration-300"
    >
      <img src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
