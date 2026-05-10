const z = require('zod');

const ventaCompletaSchema = z.object({
  clienteId: z.coerce.number().int().positive(),
  fechaVenta: z.coerce.date(),
  total: z.coerce.number().positive(),
  lineasCompra: z.array(z.object({
    productoId: z.coerce.number().int().positive(),
    cantidad: z.coerce.number().int().positive(),
    precioUnitario: z.coerce.number().positive(),
  })),
});

module.exports = {
  ventaCompletaSchema,
};
