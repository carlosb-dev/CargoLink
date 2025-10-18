import hero from "../assets/hero.png";
import logo from "../assets/logo.png";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Icono de la app temporal */}
          <div className="w-12 h-12 p-2 mr-5 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
            <img 
              src={logo}
              alt="logo"
            />
          </div>

          <span className="font-semibold tracking-wider text-3xl">
            CargoLink
          </span>
        </div>
        <nav className="hidden md:flex gap-6 text-slate-300">
          <a className="hover:text-white transition" href="#features">
            Características
          </a>
          <a className="hover:text-white transition" href="#about">
            Acerca
          </a>
          <a className="hover:text-white transition" href="#contact">
            Contacto
          </a>
        </nav>
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800 transition cursor-pointer">
            Iniciar sesión
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-md font-medium shadow hover:scale-[1.02] transition cursor-pointer">
            Regístrate
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <section className="max-w-6xl w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Transporte inteligente para la era futura
            </h1>
            <p className="text-slate-300 max-w-xl">
              Plataforma para gestionar conductores, pedidos y rutas
              con una interfaz clara y rápida. Diseñada para la simplicidad y eficiencia.
            </p>

            <div className="flex gap-4">
              <a
                className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-400 text-black font-semibold rounded shadow hover:scale-[1.02] transition"
                href="#contact"
              >
                Comenzar
              </a>
            </div>
          </div>

          {/* Hero placeholder: minimal futuristic card with gradient and subtle glow */}
          <div className="relative flex items-center justify-center">
            <img
              src={hero}
              alt="truck-hero"
              className="w-full h-auto rounded-2xl object-cover mb-25 ml-40"
            />

            {/* subtle futuristic accent */}
            <div className="pointer-events-none absolute -bottom-8 right-8 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-10 blur-3xl" />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} CargoLink
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
