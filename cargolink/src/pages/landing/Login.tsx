import { useState } from "react";
import { Link } from "react-router-dom";
import { RUTAS } from "../../data/rutas";
import Header from "../../components/Header/Header";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Footer from "../../components/Footer";
import { apiURL } from "../../data/apiData";

function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }
    
    const loginData = {
      Email: email,
      Contrasena: password,
    };

    try {
      const res = await fetch(
        apiURL + "/empresa/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        }
      );
      const datos = await res.json().catch(() => ({}));

      console.log(datos);

      if (res.status !== 200) {
        setError(datos?.message ?? "Credenciales incorrectas");
        return;
      }

      alert(datos?.message ?? "Login exitoso");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header open={open} setOpen={setOpen} />
      {open && <DropdownMenu />}

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Inicia sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
              />
            </div>
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
            {error && <div className="text-sm text-red-400">{error}</div>}
            <div className="flex items-center justify-between gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-400 text-black rounded font-semibold hover:cursor-pointer"
              >
                Entrar
              </button>
              <Link
                to={RUTAS.SIGNUP}
                className="text-sm text-slate-300 hover:text-blue-300"
              >
                ¿No tenés cuenta? Registrate
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;

