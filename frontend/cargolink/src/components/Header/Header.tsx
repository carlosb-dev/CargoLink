import React from "react";
import DropdownBoton from "../Dropdown/DropdownBoton";
import Logo from "./Logo";
import Navegacion from "./Navegacion";
import AuthBotones from "./AuthBotones";
import { Link } from "react-router-dom";
import { RUTAS } from "../../data/rutas";
import type { NavLink } from "../../data/navLinks";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarAuth?: boolean;
  mostrarNav?: boolean;
  items?: NavLink[];
};

const defaultNavItems: NavLink[] = [{ to: RUTAS.NOSOTROS, label: "Nosotros" }];

function Header({ open, setOpen, mostrarAuth, mostrarNav, items = defaultNavItems }: Props) {
  return (
    <header className="mx-auto w-full px-6 py-6 flex items-center justify-around gap-3">
      <div className="flex items-center gap-3">
        <Logo />
        <Link
          to={RUTAS.HOME}
          className="
            font-extrabold tracking-wider text-3xl text-color-white text-center 
            hover:scale-105 transition-all duration-300"
        >
          CargoLink
        </Link>
      </div>

      {mostrarNav && <Navegacion mostrar={mostrarNav} items={items} />}

      {mostrarAuth && <AuthBotones />}

      {(mostrarAuth || mostrarNav) && (
        <DropdownBoton open={open} setOpen={setOpen} />
      )}
    </header>
  );
}

export default Header;
