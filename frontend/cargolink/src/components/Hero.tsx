import hero from "../assets/hero.png";
import { Link } from "react-router-dom";
import { RUTAS } from "../rutas";

function SeccionHero() {
  return (
    <section className="max-w-6xl w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Transporte inteligente para la era futura
        </h1>
        <p className="text-slate-300 max-w-xl">
          Plataforma para gestionar conductores, pedidos y rutas con una
          interfaz clara y rápida. Diseñada para la simplicidad y eficiencia.
        </p>

        <div className="flex gap-4">
          <Link
            className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-400 text-black font-semibold rounded shadow hover:scale-[1.02] transition"
            to={RUTAS.EMPRESASIGNUP}
          >
            Comenzar
          </Link>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <img
          src={hero}
          alt="truck-hero"
          className="w-full h-auto rounded-2xl object-cover mb-25"
        />
      </div>
    </section>
  );
}

export default SeccionHero;
