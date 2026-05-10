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
- **JWT** (Autenticación)
- **bcryptjs** (Hash de contraseñas)

### Frontend
- **React**
- **React Router**
- **Axios** o **Fetch**
- **Tailwind CSS**

### Herramientas
- **Prisma Studio**
- **Nodemon**
- **Git**

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/LGilat/inventario-app.git
cd inventario-app
```

### 2. Backend
```bash
cd src  # o la carpeta donde esté el backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Estructura del proyecto

```
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
```

## 📝 Configuración de variables de entorno

Crea archivos `.env` en las carpetas raíz y `frontend/`:

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/inventario
NODE_ENV=development
PORT=5000
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## 👨‍💻 Autor

**LGilat** - [GitHub](https://github.com/LGilat)

---

⭐ Si te resulta útil, no dudes en dejar una estrella en el repositorio. ¡Gracias!
