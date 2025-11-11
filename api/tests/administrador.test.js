import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/config/database.js';

beforeAll(async () => {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida con la base de datos para pruebas de Administrador');
});

afterAll(async () => {
    await sequelize.close();
    console.log('🔌 Conexión cerrada');
});

let idAdministrador;
let idEmpresa = 1; // ajustá con un ID real de tu base
let idPedido;
let tokenAdmin;

describe('🧪 Pruebas para AdministradorController', () => {

  // Crear Administrador
test('POST /api/administrador/crear → debe crear un administrador', async () => {
    const nuevoAdministrador = {
        Nombre: 'Admin Test',
        Email: 'admintest@mail.com',
        Contrasena: 'admin123',
        idEmpresa
    };

    const res = await request(app)
        .post('/api/administrador/crear')
        .send(nuevoAdministrador);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/creado/i);
    idAdministrador = res.body.administrador?.idAdministrador;
    });

    // Login Administrador
    test('POST /api/administrador/login → debe iniciar sesión correctamente', async () => {
    const loginData = {
        Email: 'admintest@mail.com',
        Contrasena: 'admin123'
    };

    const res = await request(app)
        .post('/api/administrador/login')
        .send(loginData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        tokenAdmin = res.body.token;
    });

    // Actualizar Administrador
    test('PUT /api/administrador/actualizar → debe actualizar los datos del administrador', async () => {
        const datosActualizados = {
        idAdministrador,
        Nombre: 'Admin Test Actualizado',
        Email: 'adminactualizado@mail.com'
    };

    const res = await request(app)
        .put('/api/administrador/actualizar')
        .send(datosActualizados);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/actualizado/i);
    });

    // Obtener vehículos disponibles de su empresa
    test('GET /api/administrador/vehiculos/disponibles/:idEmpresa → debe listar los vehículos disponibles', async () => {
        const res = await request(app)
            .get(`/api/administrador/vehiculos/disponibles/${idEmpresa}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Crear pedido
    test('POST /api/administrador/pedido/crear → debe crear un pedido correctamente', async () => {
        const nuevoPedido = {
        Descripcion: 'Pedido de prueba',
        Origen: 'Depósito Central',
        Destino: 'Sucursal 3',
        idEmpresaReceptora: idEmpresa,
        Estado: 'Pendiente'
        };

    const res = await request(app)
        .post('/api/administrador/pedido/crear')
        .send(nuevoPedido);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('pedido');
        idPedido = res.body.pedido?.idPedido;
    });

    // Obtener historial de pedido
    test('GET /api/administrador/pedido/:idPedido/historial → debe devolver el historial del pedido', async () => {
        const res = await request(app)
        .get(`/api/administrador/pedido/${idPedido || 1}/historial`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('historial');
    });

    // Eliminar administrador
    test('DELETE /api/administrador/:idAdministrador → debe eliminar correctamente al administrador', async () => {
        const res = await request(app)
        .delete(`/api/administrador/${idAdministrador}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/eliminado/i);
    });
});
