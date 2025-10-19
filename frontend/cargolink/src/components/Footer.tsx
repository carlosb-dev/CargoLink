import Navegacion from "./Header/Navegacion";

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} CargoLink
        </div>

        <Navegacion mostrar={true} />
      </div>
    </footer>
  );
}

export default Footer;
