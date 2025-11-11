import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/config/database.js';

beforeAll(async () => {
    await sequelize.authenticate();
});

let idEmpresaCreada;
let idConductor;
let idVehiculo;
let idPedido;

describe('Pruebas para EmpresaController', () => {

    // Crear Empresa
    test('POST /api/empresa/crear', async () => {
        const nuevaEmpresa = {
        Nombre: 'Transporte SurTest',
        Contrasena: '123456',
        Direccion: 'Av. Rivadavia 9000',
        Email: 'testempresa@mail.com'
        };

        const res = await request(app)
            .post('/api/empresa/crear')
            .send(nuevaEmpresa);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/creada/i);
        idEmpresaCreada = res.body.empresa?.idEmpresa;
    });

    // Login Empresa
    test('POST /api/empresa/login', async () => {
        const loginData = {
        Email: 'testempresa@mail.com',
        Contrasena: '123456'
        };

        const res = await request(app)
        .post('/api/empresa/login')
        .send(loginData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    // Crear Conductor
    test('POST /api/empresa/conductor/crear → debe crear un conductor', async () => {
        const nuevoConductor = {
        Nombre: 'Juan Pérez',
        DNI: '12345678',
        Telefono: '1122334455',
        idEmpresa: idEmpresaCreada || 1
        };

        const res = await request(app)
        .post('/api/empresa/conductor/crear')
        .send(nuevoConductor);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/conductor/i);
        idConductor = res.body.conductor?.idConductor;
    });

    // Crear Vehículo
    test('POST /api/empresa/vehiculo/crear → debe crear un vehículo', async () => {
        const nuevoVehiculo = {
        Patente: 'ABC123',
        Modelo: 'Camión Volvo',
        Capacidad: 1000,
        Estado: 1,
        idEmpresa: idEmpresaCreada || 1
        };

        const res = await request(app)
        .post('/api/empresa/vehiculo/crear')
        .send(nuevoVehiculo);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('vehiculo');
        idVehiculo = res.body.vehiculo?.idVehiculo;
    });

    // Vincular Vehículo con Conductor
    test('POST /api/empresa/vincular → debe vincular correctamente un vehículo y un conductor', async () => {
        const vinculo = {
        idConductor: idConductor || 1,
        idVehiculo: idVehiculo || 1
        };

        const res = await request(app)
        .post('/api/empresa/vincular')
        .send(vinculo);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/vinculado/i);
    });

    // Obtener Conductores de la empresa
    test('GET /api/empresa/:idEmpresa/conductores → debe listar conductores', async () => {
        const res = await request(app)
        .get(`/api/empresa/${idEmpresaCreada || 1}/conductores`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Obtener Vehículos de la empresa
    test('GET /api/empresa/:idEmpresa/vehiculos → debe listar vehículos', async () => {
        const res = await request(app)
        .get(`/api/empresa/${idEmpresaCreada || 1}/vehiculos`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Obtener Pedidos donde la empresa es receptora
    test('GET /api/empresa/:idEmpresa/pedidos → debe listar pedidos', async () => {
        const res = await request(app)
        .get(`/api/empresa/${idEmpresaCreada || 1}/pedidos`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Obtener historial de pedido
    test('GET /api/empresa/pedido/:idPedido/historial → debe devolver historial del pedido', async () => {
        const res = await request(app)
        .get(`/api/empresa/pedido/${idPedido || 1}/historial`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('historial');
    });

    // Obtener todas las empresas
    test('GET /api/empresa/ → debe listar todas las empresas', async () => {
        const res = await request(app).get('/api/empresa/');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
