const z = require('zod');

const detallePedidoSchema = z.array(
  z.object({
    pedidoCompraId: z.coerce.number().min(0),
    productoId: z.coerce.number().min(0),
    cantidad: z.coerce.number().min(0),
    precioUnitario: z.coerce.number().min(0),
  })
);

module.exports = {
  detallePedidoSchema,
};
