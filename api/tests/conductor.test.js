import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/config/database.js';

beforeAll(async () => {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos para pruebas de Conductor');
});

afterAll(async () => {
    await sequelize.close();
    console.log('Conexión cerrada');
});

let idVehiculo = 1; 
let idConductor = 1; 
let idPedido = 1; 

describe('Pruebas reales del ConductorController', () => {

    // Login Conductor
    test('POST /api/conductor/login → debe iniciar sesión correctamente', async () => {
        const loginData = {
        Email: 'conductor1@mail.com',
        Licencia: 'LIC-ABC123'
        };

        const res = await request(app)
        .post('/api/conductor/login')
        .send(loginData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        idConductor = res.body.data?.idConductor || idConductor;
    });

    // Obtener pedidos por vehículo
    test('GET /api/conductor/pedidos/:idVehiculo → debe obtener pedidos del vehículo', async () => {
        const res = await request(app)
        .get(`/api/conductor/pedidos/${idVehiculo}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    // Actualizar estado del conductor a ocupado
    test('PUT /api/conductor/estado/ocupado → debe marcar al conductor como ocupado', async () => {
        const res = await request(app)
        .put('/api/conductor/estado/ocupado')
        .send({ idConductor, Estado: 0 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.message).toMatch(/actualizado/i);
    });

    // Actualizar estado del conductor a disponible
    test('PUT /api/conductor/estado/disponible → debe marcar al conductor como disponible', async () => {
        const res = await request(app)
        .put('/api/conductor/estado/disponible')
        .send({ idConductor, Estado: 1 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.message).toMatch(/actualizado/i);
    });

    // Actualizar estado del vehículo a ocupado
    test('PUT /api/conductor/vehiculo/ocupado → debe marcar el vehículo como ocupado', async () => {
        const res = await request(app)
        .put('/api/conductor/vehiculo/ocupado')
        .send({ idVehiculo, Estado: 0 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.message).toMatch(/vehículo/i);
    });

    // Actualizar estado del vehículo a disponible
    test('PUT /api/conductor/vehiculo/disponible → debe marcar el vehículo como disponible', async () => {
        const res = await request(app)
        .put('/api/conductor/vehiculo/disponible')
        .send({ idVehiculo, Estado: 1 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.message).toMatch(/vehículo/i);
    });

    // Actualizar estado del pedido
    // En este momento ya se encuentra despachado.
    test('PUT /api/conductor/pedido/estado → debe actualizar el estado del pedido', async () => {
        const res = await request(app)
        .put('/api/conductor/pedido/estado')
        .send({ idPedido, Estado: 'En viaje' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.message).toMatch(/pedido/i);
    });
});
