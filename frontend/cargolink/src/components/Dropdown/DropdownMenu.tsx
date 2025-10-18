import { Link } from "react-router-dom";
import React from "react";

type Props = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropdownMenu({ setOpen }: Props) {
  const close = () => setOpen && setOpen(false);

  return (
    <div className="hidden [@media(max-width:950px)]:inline-flex bg-slate-900/80 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
        <Link onClick={close} className="text-slate-200 py-2" to="/conductores">
          Conductores
        </Link>
        <Link
          onClick={close}
          className="text-slate-200 py-2"
          to="/admin"
        >
          Administradores
        </Link>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            onClick={close}
            to="/login"
            className="w-full px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800 transition text-center"
          >
            Iniciá sesión
          </Link>
          <Link
            onClick={close}
            to="/signup"
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-md font-medium shadow hover:scale-[1.02] transition text-center"
          >
            Registrá tu empresa
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
