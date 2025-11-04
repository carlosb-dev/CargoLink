import { Link } from "react-router-dom";

type Props = {
  to: string;
  label?: string;
};

function VolverBoton({ to, label = "Volver" }: Props) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-3 py-2 rounded border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition"
      aria-label={label}
    >
      <span className="select-none">⟵</span>
      <span>{label}</span>
    </Link>
  );
}

export default VolverBoton;

