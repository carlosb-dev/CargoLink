/*Para administrador debera encargarse de lo siguiente:
-Crear pedido => para eso va a tener que tener, listado de vehiculos que tenga un conductor vinculado y libre, listado de datos de su empresa y de la empresa destino 
- Bandeja de entrada de pedido que esten vinculado a la empresa del administrador, osea la receptora.
- Actualizar el pedido de "entregado" a recibido
- Mirar el historial de cada paquete*/

import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";

describe("Pruebas para AdministradorController", () => {
  // ==========================
  // Crear Administrador
  // ==========================
  test("POST /api/administrador/crear → debe crear un administrador", async () => {
    const nuevoAdmin = {
      Nombre: "AdminTest",
      Contrasena: "123456",
      Email: "admintest@test.com",
      idEmpresa: 1,
    };

    const res = await request(app)
      .post("/api/administrador/crear")
      .send(nuevoAdmin);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    idAdministradorCreado = res.body.administrador?.idAdministrador;
  });

  // ==========================
  // Login Administrador
  // ==========================
  test("POST /api/administrador/login → login correcto", async () => {
    const adminLogin = {
      Email: "admintest@test.com",
      Contrasena: "123456",
    };

    const res = await request(app)
      .post("/api/administrador/login")
      .send(adminLogin);

    expect(res.status).toBe(200);
  });

  // ==========================
  // Obtener vehículos disponibles
  // ==========================
  test("GET /api/administrador/vehiculos/disponibles/:idEmpresa → devuelve vehículos libres", async () => {
    const res = await request(app).get(
      "/api/administrador/vehiculos/disponibles/1"
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // ==========================
  // Obtener historial de un pedido
  // ==========================
  test("GET /api/administrador/pedido/:idPedido/historial → historial devuelto correctamente", async () => {
    const res = await request(app).get("/api/administrador/pedido/1/historial");

    expect(res.status).toBe(200);
  });

  // ==========================
  // Crear un pedido
  // ==========================
  test("POST /api/administrador/pedido/crear → debe crear un pedido", async () => {
    const pedido = {
      Nombre: "Cajas de prueba",
      Peso: 100.5,
      Volumen: 2.5,
      Estado: "Despachado",
      Origen: "Buenos Aires",
      Destino: "Córdoba",
      idVehiculo: 2,
      idAdministrador: 2,
      idEmpresa: 1,
    };

    const res = await request(app)
      .post("/api/administrador/pedido/crear")
      .send(pedido);

    expect(res.status).toBe(201);
  });

  // ==========================
  // Bandeja de pedidos (entrada)
  // ==========================
  test("GET /api/administrador/pedidos/entrada/:idEmpresa → lista pedidos asignados a la empresa", async () => {
    const res = await request(app).get("/api/administrador/pedidos/entrada/1");

    expect(res.status).toBe(200);
  });

  // ==========================
  // Actualizar estado de pedido a RECIBIDO
  // ==========================
  test("PUT /api/administrador/pedido/:idPedido/actualizarEstado → debe actualizar estado a recibido", async () => {
    const update = { Estado: "Recibido" };

    const res = await request(app)
      .put("/api/administrador/pedido/1/actualizarEstado")
      .send(update);

    expect(res.status).toBe(200);
  });
});
