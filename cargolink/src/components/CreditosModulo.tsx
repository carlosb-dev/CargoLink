
function CreditosModulo({nombre, rol, enlace, linkText}: {nombre: string; rol: string; enlace: string; linkText?: string}) {
  return (
    <div className="bg-slate-800/30 p-4 rounded-lg hover:scale-110 transition-all duration-300">
      <div className="font-medium">{nombre}</div>
      <div className="text-sm text-slate-400">{rol}</div>
      <a
        className="text-cyan-300 text-sm mt-2 block"
        href={enlace}
        target="_blank"
        rel="noreferrer"
      >
        {linkText} ➜
      </a>
    </div>
  );
}

export default CreditosModulo;


// Carlos Bello
// Front-end y diseño
// github.com/carlosb-dev