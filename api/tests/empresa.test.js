import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";

beforeAll(async () => {
  await sequelize.authenticate();
});

let idEmpresaCreada;
let idConductor;
let idVehiculo;
let idPedido;

describe("Pruebas para EmpresaController", () => {
  // Crear Empresa
  test("POST /api/empresa/crear", async () => {
    const nuevaEmpresa = {
      Nombre: "Carlos SRC",
      Contrasena: "1234",
      Direccion: "caseros 123",
      Email: "Carlos@gmail.com",
    };

    const res = await request(app)
      .post("/api/empresa/crear")
      .send(nuevaEmpresa);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/creada/i);
    idEmpresaCreada = res.body.empresa?.idEmpresa;
  });

  // Login Empresa
  test("POST /api/empresa/login", async () => {
    const loginData = {
      Email: "Carlos@gmail.com",
      Contrasena: "1234",
    };

    const res = await request(app).post("/api/empresa/login").send(loginData);

    expect(res.status).toBe(200);
  });

  // Crear Conductor
  test("POST /api/empresa/conductor/crear → debe crear un conductor", async () => {
    const nuevoConductor = {
      Nombre: "Pablito",
      Licencia: "qwerty1234",
      Estado: 1,
      Email: "pablico@gmail.com",
      idEmpresa: 1,
    };

    const res = await request(app)
      .post("/api/empresa/conductor/crear")
      .send(nuevoConductor);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/conductor/i);
    idConductor = res.body.conductor?.idConductor;
  });

  // Crear Vehículo
  test("POST /api/empresa/vehiculo/crear → debe crear un vehículo", async () => {
    const nuevoVehiculo = {
      Matricula: "h53bv13",
      Tipo: "Camión",
      Modelo: "Fiat Corso 2020",
      Cantidad_paquetes: 25,
      Capacidad: 1000,
      idEmpresa: 1,
    };

    const res = await request(app)
      .post("/api/empresa/vehiculo/crear")
      .send(nuevoVehiculo);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("vehiculo");
    idVehiculo = res.body.vehiculo?.idVehiculo;
  });

  // Vincular Vehículo con Conductor
  test("POST /api/empresa/vincular → debe vincular correctamente un vehículo y un conductor", async () => {
    const vinculo = {
      idConductor: 3,
      idVehiculo: 3,
    };

    const res = await request(app).post("/api/empresa/vincular").send(vinculo);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/vinculado/i);
  });

  // Obtener Conductores de la empresa
  test("GET /api/empresa/:idEmpresa/conductores → debe listar conductores", async () => {
    const res = await request(app).get(`/api/empresa/${1}/conductores`);

    expect(res.status).toBe(200);
  });

  // Obtener Vehículos de la empresa
  test("GET /api/empresa/:idEmpresa/vehiculos → debe listar vehículos", async () => {
    const res = await request(app).get(`/api/empresa/${1}/vehiculos`);

    expect(res.status).toBe(200);
  });

  // Obtener Pedidos donde la empresa es receptora
  test("GET /api/empresa/:idEmpresa/pedidos → debe listar pedidos", async () => {
    const res = await request(app).get(`/api/empresa/${1}/pedidos`);

    expect(res.status).toBe(200);
  });

  // Obtener historial de pedido
  test("GET /api/empresa/pedido/:idPedido/historial → debe devolver historial del pedido", async () => {
    const res = await request(app).get(`/api/empresa/pedido/${1}/historial`);

    expect(res.status).toBe(200);
  });

  // 15/11

  // ==========================
  // Actualizar Administrador
  // ==========================
  test("PUT /api/empresa/administrador/:idAdministrador → debe actualizar administrador", async () => {
    const updateData = {
      idAdministrador: 2,
      Nombre: "Sebastian",
      Contrasena: "asdfghjkl",
      Email: "sabastian@gmail.com",
    };

    const res = await request(app)
      .put("/api/empresa/administrador/actualizar/2")
      .send(updateData);

    expect(res.status).toBe(200);
  });

  // ==========================
  // Eliminar Administrador
  // ==========================
  test("DELETE /api/empresa/administrador/:idAdministrador → debe eliminar administrador", async () => {
    const res = await request(app).delete(
      "/api/empresa/administrador/eliminar/2"
    );

    expect(res.status).toBe(200);
  });

  // ==========================
  // Actualizar Vehículo
  // ==========================
  test("PUT /api/empresa/vehiculo/:idVehiculo → debe actualizar vehículo", async () => {
    const updateData = {
      idVehiculo: 3,
      Matricula: "AA111BB",
    };

    const res = await request(app)
      .put("/api/empresa/vehiculo/actualizar/vehiculo/3")
      .send(updateData);

    expect(res.status).toBe(200);
  });

  // ==========================
  // Eliminar Vehículo
  // ==========================
  test("DELETE /api/empresa/vehiculo/:idVehiculo → debe eliminar vehículo", async () => {
    const res = await request(app).delete("/api/empresa/vehiculo/eliminar/4");

    expect(res.status).toBe(200);
  }); //para funcionar primero se debera desvincular el vehiculo si esta vinculado a algun conductor

  // ==========================
  // Actualizar Conductor
  // ==========================
  test("PUT /api/empresa/conductor/:idConductor → debe actualizar conductor", async () => {
    const updateData = {
      idConductor: 3,
      Nombre: "Nuevo Nombre",
      Licencia: "XYZ12345",
      Email: "nuevo@mail.com",
    };

    const res = await request(app)
      .put("/api/empresa/conductor/actualizar/3")

      .send(updateData);

    expect(res.status).toBe(200);
  });

  // ==========================
  // Eliminar Conductor
  // ==========================
  test("DELETE /api/empresa/conductor/:idConductor → debe eliminar conductor", async () => {
    const res = await request(app).delete("/api/empresa/conductor/eliminar/4");

    expect(res.status).toBe(200);
  }); //para funcionar primero se debera desvincular el vehiculo si esta vinculado a algun conductor
});
