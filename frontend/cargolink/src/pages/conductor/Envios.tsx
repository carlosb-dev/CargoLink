import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { CONDUCTOR_NAV_ITEMS } from "../../data/navLinks";
import {
  defaultOrdenes,
  defaultPedidos,
  defaultVehiculos,
} from "../../data/empresaTablas";

type Envio = {
  id: number;
  nombre: string;
  destino: string;
  peso: string;
  estadoActual: string;
  vehiculoId: number;
  tipo: "pedido" | "orden";
};

const enviosDespachados: Envio[] = [
  ...defaultPedidos.map((pedido) => ({ ...pedido, tipo: "pedido" as const })),
  ...defaultOrdenes.map((orden) => ({ ...orden, tipo: "orden" as const })),
]
  .filter(
    (envio) => envio.estadoActual.toLowerCase() === "despachado".toLowerCase()
  )
  .map((envio) => ({
    id: envio.id,
    nombre: envio.nombre,
    destino: envio.destino,
    peso: envio.peso,
    estadoActual: envio.estadoActual,
    vehiculoId: envio.vehiculoId,
    tipo: envio.tipo,
  }));

function ConductorEnvios() {
  const [open, setOpen] = useState(false);
  const [envios, setEnvios] = useState<Envio[]>(enviosDespachados);

  const vehiculosPorId = useMemo(() => {
    const lookup = new Map<number, string>();
    defaultVehiculos.forEach((vehiculo) => {
      lookup.set(
        vehiculo.id,
        `${vehiculo.placa} (${vehiculo.modelo})`.trim()
      );
    });
    return lookup;
  }, []);

  const columns = useMemo(
    () => [
      { key: "referencia", label: "Referencia" },
      { key: "nombre", label: "Carga" },
      { key: "destino", label: "Destino" },
      { key: "peso", label: "Peso" },
      { key: "vehiculo", label: "Vehiculo" },
      { key: "estadoActual", label: "Estado" },
      { key: "acciones", label: "" },
    ],
    []
  );

  function handleIniciarViaje(id: number, tipo: Envio["tipo"]) {
    setEnvios((prev) =>
      prev.filter((envio) => !(envio.id === id && envio.tipo === tipo))
    );
  }

  const rows = envios.map((envio) => {
    const referenciaPrefix = envio.tipo === "orden" ? "ORD" : "PED";
    const referencia = `${referenciaPrefix}-${envio.id
      .toString()
      .padStart(3, "0")}`;
    const vehiculoEtiqueta =
      vehiculosPorId.get(envio.vehiculoId) ?? "Sin vehiculo";

    return {
      referencia,
      nombre: envio.nombre,
      destino: envio.destino,
      peso: envio.peso,
      vehiculo: vehiculoEtiqueta,
      estadoActual: envio.estadoActual,
      acciones: (
        <button
          onClick={() => handleIniciarViaje(envio.id, envio.tipo)}
          className="px-4 py-2 rounded bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow hover:scale-105 transition-all duration-150"
        >
          Iniciar viaje
        </button>
      ),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarNav={true}
        items={CONDUCTOR_NAV_ITEMS}
      />

      <DropdownMenu
        open={open}
        mostrarNav={true}
        items={CONDUCTOR_NAV_ITEMS}
      />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Envios de cargas
            </h1>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Envios despachados</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {rows.length > 0 ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <p className="text-slate-400 text-sm">
                  No tienes envios despachados pendientes. Vuelve mas tarde.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ConductorEnvios;
