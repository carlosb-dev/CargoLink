import { Link } from "react-router-dom";
import type { NavLink } from "../../data/navLinks";

type Props = {
  mostrar?: boolean;
  items?: NavLink[];
};

function Navegacion({ mostrar = false, items = [] }: Props) {
  return (
    <nav className={`${mostrar ? "hidden lg:flex" : "flex flex-col justify-center"} flex gap-6 text-slate-300 `}>
      {items.map((item) => (
        <Link key={item.to} className="hover:text-white transition" to={item.to}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navegacion;
