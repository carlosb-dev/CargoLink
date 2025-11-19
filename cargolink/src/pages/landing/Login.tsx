import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RUTAS } from "../../data/rutas";
import Header from "../../components/Header/Header";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Footer from "../../components/Footer";
import {
  getStoredUserFromCookie,
  persistUserCookie,
  type EmpresaData,
} from "../../utils/cookies";
import { loginEmpresa, type LoginData } from "../../utils/auth";

function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<EmpresaData | null>(() =>
    getStoredUserFromCookie()
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      setIsLoading(true);
      const result = await loginEmpresa(loginData);

      if (!result.success) {
        setError(result.message ?? "Credenciales incorrectas");
        return;
      }

      const datos: LoginData | undefined = result.data;
      if (datos?.data) {
        persistUserCookie(datos.data);
        setCurrentUser(datos.data);
      }

      navigate(RUTAS.EMPRESA_PANEL);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
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
            {currentUser && (
              <div className="text-sm text-green-400">
                Sesión activa: {currentUser.Nombre}
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-cyan-400 text-black rounded font-semibold hover:cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Cargando..." : "Entrar"}
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
