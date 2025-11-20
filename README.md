## Computación 2025

# 🚌 **Proyecto Final - Generacion T**

---

# 🚚 CargoLink — Sistema de Gestión Logística

CargoLink es una aplicación web desarrollada como **Proyecto Final de la especialidad Computación**, orientada a la digitalización y administración de empresas de transporte y logística.

Este proyecto incluye **Frontend + Backend + Base de Datos**, conectados y completamente funcionales.

---

# 🧠 **Descripción del Proyecto**

CargoLink permite que una empresa de logística gestione digitalmente sus recursos.
El sistema implementa:

 ✔ Registro de empresa.
 ✔ Inicio de sesión por rol.
 ✔ Gestión de administradores.
 ✔ Gestión de conductores.
 ✔ Gestión de vehículos.
 ✔ Asignación de vehículos a conductores.
 ✔ Seguimiento de pedidos.

El objetivo es brindar una plataforma sencilla y eficiente para administrar una flota de transporte y su personal, facilitando flujos de trabajo típicos de una empresa logística.

---

# 🌐 **Demo del Proyecto**

### **Frontend**
🔗 https://cargolink-lilac.vercel.app/

> **Nota:** La página hosteada en Vercel actualmente solo implementa las vistas y funcionalidades de **Empresa**.
> 
Desde allí podés:
- Registrar una empresa.
- Iniciar sesión.
- Crear administradores.
- Registrar conductores.
- Registrar vehículos.
- Vincular vehículos a conductores.

### **Backend**
🔗 [Link al repo del Backend](https://github.com/SirFrancis2007/Backend-cargolink)

El backend y la base de datos MySQL se encuentran hosteados en Railway. Incluye:
- API REST hecha con **Node.js + Express**.
- Base de datos **MySQL**.
- Endpoints protegidos por autenticación.
- Control de roles. (Empresa / Admin / Conductor)
- Relaciones completas. (vehículos, conductores, empresas, asignaciones, etc.)

## Inicializar el Frontend (`cargolink/`)
```bash
cd cargolink
npm install
npm run dev       # http://localhost:5173
npm run build     # build de produccion
```
---

# 🛠️ **Tecnologías utilizadas**

### **Frontend**
- React + Vite
- TypeScript
- CSS / Tailwind

### **Backend**
- Node.js
- Express
- MySQL

---

# 📦 **Características Principales del Sistema**

### **👤 Empresa**
- Registro e inicio de sesión.
- Panel general.
- Registrar administradores.
- Registrar conductores.
- Registrar vehículos.
- Asignar un vehículo disponible a un conductor.

### **🧑‍💼 Administrador**
- Puede ser creado por la empresa.
- Gestiona pedidos. (en versiones futuras)

### **🧑‍🔧 Conductor**
- Puede tener un vehículo asignado.
- Visualizar tareas. (en versiones futuras)
- Gestionar envíos. (en versiones futuras)

---

# 👥 **Integrantes del Proyecto**

- **Carlos Bello** - [carlosb-dev](https://github.com/carlosb-dev)
- **Jorge Casco** - [jorge-link](https://github.com/jorge-link)
- **Francisco García** - [SirFrancis2007](https://github.com/SirFrancis2007) 

Escuela Técnica Nº12 D.E. 1º “Libertador Gral. José de San Martín”
Especialidad Computación — Egresados 2025

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.