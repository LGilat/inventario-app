const z = require('zod');

const proveedorSchema = z.object({
  nombre: z.string().min(3).max(50),
  contacto: z.string().min(3).max(50),
  direccion: z.string().min(3).max(50),
});

const proveedorPartialSchema = proveedorSchema.partial();

module.exports = {
  proveedorSchema,
  proveedorPartialSchema,
};
