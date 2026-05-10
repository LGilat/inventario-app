const z = require('zod');

const clienteSchema = z.object({
  nombre: z.string().min(3).max(50),
  contacto: z.string().min(3).max(50),
  direccion: z.string().min(3).max(50),
});

const clientePartialSchema = clienteSchema.partial();

module.exports = {
  clienteSchema,
  clientePartialSchema,
};
