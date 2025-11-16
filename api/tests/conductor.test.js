import request from "supertest";
import app from "../src/app.js";

describe("Pruebas para ConductorController", () => {
  // LOGIN
  test("POST /api/conductor/login → inicia sesión correctamente", async () => {
    const loginData = { Licencia: "2345678", Email: "pepe@test.com" }; // Corresponde a pepe

    const res = await request(app).post("/api/conductor/login").send(loginData);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  test("POST /api/conductor/login → rechaza credenciales inválidas", async () => {
    const res = await request(app).post("/api/conductor/login").send({
      Licencia: "XXXX",
      Email: "correo@incorrecto.com",
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // PEDIDOS POR VEHÍCULO
  test("GET /api/conductor/pedidos/:idVehiculo → devuelve pedidos del vehículo", async () => {
    const res = await request(app).get("/api/conductor/pedidos/2"); // El segundo vehiculo tiene asignado el pedido de id 1

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // CONDUCTOR OCUPADO
  test("PUT /api/conductor/estado/ocupado → actualiza a ocupado", async () => {
    const res = await request(app)
      .put("/api/conductor/estado/ocupado")
      .send({ idConductor: 2, Estado: 0 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // CONDUCTOR DISPONIBLE
  test("PUT /api/conductor/estado/disponible → actualiza a disponible", async () => {
    const res = await request(app)
      .put("/api/conductor/estado/disponible")
      .send({ idConductor: 2, Estado: 1 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // VEHÍCULO OCUPADO
  test("PUT /api/conductor/vehiculo/ocupado → actualiza a ocupado", async () => {
    const res = await request(app)
      .put("/api/conductor/vehiculo/ocupado")
      .send({ idVehiculo: 5, Estado: 0 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // VEHÍCULO DISPONIBLE
  test("PUT /api/conductor/vehiculo/disponible → actualiza a disponible", async () => {
    const res = await request(app)
      .put("/api/conductor/vehiculo/disponible")
      .send({ idVehiculo: 5, Estado: 1 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // ACTUALIZAR ESTADO DEL PEDIDO
  test("PUT /api/conductor/pedido/estado → actualiza estado del pedido", async () => {
    const res = await request(app)
      .put("/api/conductor/pedido/estado")
      .send({ idPedido: 1, Estado: "Entregado" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
