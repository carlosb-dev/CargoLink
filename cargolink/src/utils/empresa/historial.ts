import { apiURL } from "../../data/apiData";

// -------------------------------
//    TIPOS
// -------------------------------

export type HistorialPedido = {
  id?: number;
  tipo: string;
  conductor: string;
  matricula: string;
  estadoAnterior: string;
  estadoActual: string;
  fechaModificacion: string;
  nombrePedido: string;
  destino: string;
};

// -------------------------------
//    GET
// -------------------------------

export async function fetchHistorialPedidos(
  idEmpresa: number
): Promise<HistorialPedido[]> {
  const response = await fetch(`${apiURL}/empresa/${idEmpresa}/pedidos`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener el historial: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as
    | HistorialPedido[]
    | {
        pedidos?: HistorialPedido[];
        historial?: HistorialPedido[];
        data?: HistorialPedido[];
      };

  const list = Array.isArray(data)
    ? data
    : data?.pedidos ?? data?.historial ?? data?.data;

  return Array.isArray(list) ? list : [];
}
