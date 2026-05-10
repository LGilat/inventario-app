const z = require('zod');

const productoSchema = z.object({
  nombre: z.string().min(3).max(50),
  descripcion: z.string().min(3).max(50),
  categoria: z.string().min(3).max(50),
  precioCompra: z.coerce.number().min(0),
  precioVenta: z.coerce.number().min(0),
});

const productoPartialSchema = productoSchema.partial();

module.exports = {
  productoSchema,
  productoPartialSchema,
};
