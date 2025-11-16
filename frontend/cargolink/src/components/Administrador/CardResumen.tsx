import { Link } from "react-router-dom";

type CardProps = {
  titulo: string;
  descripcion: string;
  cantidad: number;
  botonLabel: string;
  to: string;
};

function CardResumen({ titulo, descripcion, cantidad, botonLabel, to }: CardProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        
      </div>
      <div>
        
        <h2 className="text-xl font-semibold">
            <span className="text-4xl font-bold text-cyan-400">{cantidad} </span>
            {titulo}</h2>
        <p className="text-slate-300 text-sm mt-1">{descripcion}</p>
      </div>
      <Link
        to={to}
        className="inline-block text-center px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-medium hover:scale-105 transition-all duration-100"
      >
        {botonLabel}
      </Link>
    </div>
  );
}

export default CardResumen;