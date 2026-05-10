const z = require('zod');

const pedidoCompraSchema = z.object({
  fechaPedido: z.coerce.date(),
  estado: z.string().min(3).max(50),
  proveedorId: z.coerce.number().min(0),
});

module.exports = {
  pedidoCompraSchema,
};
