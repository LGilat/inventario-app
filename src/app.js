const express = require("express");
const cors = require("cors");

const clienteRoutes = require("./routes/cliente.routes");
const proveedorRoutes = require("./routes/proveedor.routes");
const productoRoutes = require("./routes/producto.routes");
const pedidoCompraRoutes = require("./routes/pedidoCompra.routes");
const detallePedidoRoutes = require("./routes/detallePedido.routes");
const stockRoutes = require("./routes/stock.routes");
const ventaRoutes = require("./routes/venta.routes");

const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://inventario-app-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // permitir peticiones sin origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS no permitido"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// importante para preflight
app.options("*", cors());
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

app.use("/api", clienteRoutes);
app.use("/api", proveedorRoutes);
app.use("/api", productoRoutes);
app.use("/api", pedidoCompraRoutes);
app.use("/api", detallePedidoRoutes);
app.use("/api", stockRoutes);
app.use("/api", ventaRoutes);

module.exports = app;
