import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import CardResumen from "../../components/Administrador/CardResumen";
import Footer from "../../components/Footer";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { CONDUCTOR_NAV_ITEMS } from "../../data/navLinks";
import {
  defaultOrdenes,
  defaultPedidos,
  defaultVehiculos,
} from "../../data/empresaTablas";
import { RUTAS } from "../../data/rutas";

const condcutorNombre = "Conductor 1";

type Envio = {
  id: number;
  nombre: string;
  destino: string;
  peso: string;
  estadoActual: string;
  vehiculoId: number;
  tipo: "pedido" | "orden";
};

const enviosBase: Envio[] = [
  ...defaultPedidos.map((pedido) => ({ ...pedido, tipo: "pedido" as const })),
  ...defaultOrdenes.map((orden) => ({ ...orden, tipo: "orden" as const })),
];

function ConductorPanel() {
  const [open, setOpen] = useState(false);

  const enviosDespachados = useMemo(
    () =>
      enviosBase.filter(
        (envio) => envio.estadoActual.toLowerCase() === "despachado"
      ),
    []
  );

  const envioEnCursoInicial = useMemo(
    () =>
      enviosBase.find(
        (envio) => envio.estadoActual.toLowerCase() === "en camino"
      ) ?? null,
    []
  );

  const [envioEnCurso, setEnvioEnCurso] = useState<Envio | null>(
    envioEnCursoInicial
  );

  const vehiculosPorId = useMemo(() => {
    const mapa = new Map<number, string>();
    defaultVehiculos.forEach((vehiculo) => {
      mapa.set(vehiculo.id, `${vehiculo.placa} (${vehiculo.modelo})`.trim());
    });
    return mapa;
  }, []);

  function handleMarcarEntregado() {
    if (!envioEnCurso) return;
    setEnvioEnCurso(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarNav={true}
        items={CONDUCTOR_NAV_ITEMS}
      />

      <DropdownMenu open={open} mostrarNav={true} items={CONDUCTOR_NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl m-auto px-6 py-8 space-y-8 flex flex-col items-center">
          <section className=" w-full bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Bienvenido,  {condcutorNombre}.
            </h1>
            <p className="text-slate-300">
              Revisa el estado de tus envios despachados y el viaje que tienes
              en curso.
            </p>
          </section>

          <section className="w-[50%] grid grid-cols-1 gap-6">
            <CardResumen
              titulo="Envíos pendientes"
              descripcion="Pedidos listos para entregar."
              cantidad={enviosDespachados.length}
              botonLabel="Ir a envíos"
              to={RUTAS.CONDUCTOR_ENVIOS}
            />

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Envio en curso
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Detalles del viaje que estas realizando ahora.
                </p>
              </div>

              {envioEnCurso ? (
                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <span className="text-slate-400">Carga:</span>{" "}
                    <span className="font-semibold">{envioEnCurso.nombre}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Destino:</span>{" "}
                    <span className="font-semibold">
                      {envioEnCurso.destino}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-400">Peso:</span>{" "}
                    <span className="font-semibold">{envioEnCurso.peso}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Vehiculo:</span>{" "}
                    <span className="font-semibold">
                      {vehiculosPorId.get(envioEnCurso.vehiculoId) ??
                        "Sin asignar"}
                    </span>
                  </p>

                  <button
                    onClick={handleMarcarEntregado}
                    className="mt-4 w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.01] transition-all duration-150"
                  >
                    Marcar como entregado
                  </button>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">
                  No tienes envios en curso. Inicia un nuevo viaje desde la
                  lista de envios despachados.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ConductorPanel;
