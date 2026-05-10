# Gestor de Inventario

Sistema completo de gestión de inventario desarrollado con **Node.js**, **Express**, **Prisma** y **React**.

Un proyecto práctico, limpio y escalable pensado para pequeñas y medianas empresas, tiendas o almacenes.

![Vista del proyecto](https://via.placeholder.com/800x400?text=Vista+del+Proyecto) <!-- Cuando despliegues, cambia esta imagen -->

## ✨ Características

- **Gestión completa de productos** (CRUD)
- **Control de stock** con alertas de bajo inventario
- **Categorías y proveedores**
- **Interfaz moderna** con React
- **Backend robusto** con Express + Prisma
- **Base de datos** PostgreSQL (fácil de cambiar a SQLite para desarrollo)
- **API REST** bien estructurada
- **Validaciones** y manejo de errores

## 🛠️ Tecnologías utilizadas

### Backend
- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** (Autenticación) *(si lo tienes)*
- **bcryptjs** (Hash de contraseñas)

### Frontend
- **React**
- **React Router**
- **Axios** o **Fetch**
- **Tailwind CSS** (o el que uses)

### Herramientas
- **Prisma Studio**
- **Nodemon**
- **Git**

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/LGilat/inventario-app.git
cd inventario-app
``

### Backend
cd src  # o la carpeta donde esté el backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


### FRONTEND
cd frontend
npm install
npm run dev

📁 Estructura del proyecto
inventario-app/
├── prisma/              # Esquema de base de datos
├── src/                 # Backend (Express)
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── frontend/            # React
├── tests/
├── app.js
└── package.json
