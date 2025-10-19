import { useState } from "react";
import { Link } from "react-router-dom";
import { RUTAS } from "../rutas";
import Header from "../components/Header/Header";
import DropdownMenu from "../components/Dropdown/DropdownMenu";
import Footer from "../components/Footer";

function Signup() {
  const [open, setOpen] = useState(false);
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!empresa || !email || !password || !confirmar) {
      setError("Completa todos los campos");
      return;
    }

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length <= 8 || password.length >= 16) {
      setError("La contraseña debe tener entre 8 y 16 caracteres");
      return;
    }

    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!$%^&#@]/.test(password);

    if (!hasNumber || !hasSpecial) {
      setError(
        "La contraseña debe contener al menos un número y un carácter especial (!£$%^&#@)"
      );
      return;
    }

    //Aqui se llama a la API para crear la cuenta
    console.log("Registro exitoso:", { empresa, email });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header open={open} setOpen={setOpen} />
      {open && <DropdownMenu setOpen={setOpen} />}

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Nombre de la empresa
              </label>
              <input
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
              />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Repetir contraseña
              </label>
              <input
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
              />
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-400 text-black rounded font-semibold  hover:cursor-pointer"
              >
                Crear cuenta
              </button>

              <Link
                to={RUTAS.EMPRESALOGIN}
                className="text-sm text-slate-300 hover:text-blue-300"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;
