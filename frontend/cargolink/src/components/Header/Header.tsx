import React from "react";
import DropdownButton from "../Dropdown/DropdownBoton";
import Logo from "./Logo";
import Navegacion from "./Navegacion";
import AuthBotones from "./AuthBotones";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ open, setOpen }: Props) {
  return (
    <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo />
        <span className="font-semibold tracking-wider text-3xl">CargoLink</span>
      </div>

      <Navegacion />

      {/* Botones Auth */}
      <AuthBotones />

      <DropdownButton open={open} setOpen={setOpen} />
    </header>
  );
}

export default Header;
