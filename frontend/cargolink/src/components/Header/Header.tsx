import React from "react";
import DropdownBoton from "../Dropdown/DropdownBoton";
import Logo from "./Logo";
import Navegacion from "./Navegacion";
import AuthBotones from "./AuthBotones";
import { Link } from "react-router-dom";
import { RUTAS } from "../../rutas";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarAuth?: boolean;
  mostrarNav?: boolean;
};

function Header({ open, setOpen, mostrarAuth, mostrarNav }: Props) {
  return (
    <header className="mx-auto w-4/5 px-6 py-6 flex items-center justify-between gap-3">
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

      {mostrarNav && <Navegacion mostrar={mostrarNav} />}

      {mostrarAuth && <AuthBotones />}

      {(mostrarAuth || mostrarNav) && (
        <DropdownBoton open={open} setOpen={setOpen} />
      )}
    </header>
  );
}

export default Header;
