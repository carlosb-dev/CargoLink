import React, { useEffect, useState } from "react";
import DropdownBoton from "../Dropdown/DropdownBoton";
import Logo from "./Logo";
import Navegacion from "./Navegacion";
import AuthBotones from "./AuthBotones";
import { Link } from "react-router-dom";
import { RUTAS } from "../../data/rutas";
import type { NavLink } from "../../data/navLinks";
import {
  clearUserCookie,
  getStoredUserFromCookie,
  type EmpresaData,
} from "../../utils/cookies";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarAuth?: boolean;
  mostrarNav?: boolean;
  items?: NavLink[];
};

const defaultNavItems: NavLink[] = [{ to: RUTAS.NOSOTROS, label: "Nosotros" }];

function Header({
  open,
  setOpen,
  mostrarAuth,
  mostrarNav,
  items = defaultNavItems,
}: Props) {
  const [currentUser, setCurrentUser] = useState<EmpresaData | null>(null);

  useEffect(() => {
    setCurrentUser(getStoredUserFromCookie());
  }, []);

  function handleLogout() {
    clearUserCookie();
    setCurrentUser(null);
  }

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

      {mostrarAuth && !currentUser && <AuthBotones />}

      {currentUser && (
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-sm font-semibold text-slate-100 border border-slate-500 rounded hover:bg-slate-800 transition-colors"
        >
          Cerrar sesión
        </button>
      )}

      {(mostrarAuth || mostrarNav) && (
        <DropdownBoton open={open} setOpen={setOpen} />
      )}
    </header>


  );
}

export default Header;
