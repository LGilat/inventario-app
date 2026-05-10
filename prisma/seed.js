const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el sembrado de datos...');

  // 1. Crear Proveedores
  const proveedor1 = await prisma.proveedor.create({
    data: {
      nombre: 'Tecnología Global S.A.',
      contacto: 'ventas@tecglobal.com',
      direccion: 'Av. Industrial 123, Madrid'
    }
  });

  const proveedor2 = await prisma.proveedor.create({
    data: {
      nombre: 'Suministros Oficina Express',
      contacto: 'info@ofiexpress.es',
      direccion: 'Calle Mayor 45, Barcelona'
    }
  });

  // 2. Crear Productos
  const productosData = [
    { nombre: 'Laptop Pro 15', descripcion: 'Core i7, 16GB RAM, 512GB SSD', categoria: 'Electrónica', precioCompra: 800, precioVenta: 1200 },
    { nombre: 'Monitor 4K 27"', descripcion: 'Panel IPS, 144Hz', categoria: 'Electrónica', precioCompra: 200, precioVenta: 350 },
    { nombre: 'Teclado Mecánico RGB', descripcion: 'Switches Cherry MX Blue', categoria: 'Periféricos', precioCompra: 50, precioVenta: 95 },
    { nombre: 'Ratón Ergonómico', descripcion: 'Inalámbrico, 16000 DPI', categoria: 'Periféricos', precioCompra: 30, precioVenta: 65 },
    { nombre: 'Silla Gamer Black Edition', descripcion: 'Ergonómica con soporte lumbar', categoria: 'Muebles', precioCompra: 120, precioVenta: 210 },
    { nombre: 'Escritorio Elevable', descripcion: 'Motor dual, 160x80cm', categoria: 'Muebles', precioCompra: 250, precioVenta: 450 },
  ];

  const productos = [];
  for (const p of productosData) {
    const prod = await prisma.producto.create({ data: p });
    productos.push(prod);
    
    // Crear stock inicial para cada producto
    await prisma.stock.create({
      data: {
        productoId: prod.id,
        cantidad: Math.floor(Math.random() * 50) + 10,
        ubicacion: 'Almacén Principal - Estante ' + (Math.floor(Math.random() * 10) + 1),
        fechaActualizacion: new Date()
      }
    });
  }

  // 3. Crear Clientes
  const cliente1 = await prisma.cliente.create({
    data: { nombre: 'Juan Pérez', contacto: 'juan.perez@email.com', direccion: 'Calle Falsa 123' }
  });

  const cliente2 = await prisma.cliente.create({
    data: { nombre: 'María García', contacto: 'm.garcia@email.com', direccion: 'Plaza España 5' }
  });

  const cliente3 = await prisma.cliente.create({
    data: { nombre: 'Empresa Soluciones IT', contacto: 'contacto@solucionesit.biz', direccion: 'Edificio Alfa, Of. 202' }
  });

  // 4. Crear algunas Ventas
  const ventas = [
    {
      clienteId: cliente1.id,
      fechaVenta: new Date(),
      total: 1200,
      detalles: [{ productoId: productos[0].id, cantidad: 1, precioUnitario: 1200 }]
    },
    {
      clienteId: cliente2.id,
      fechaVenta: new Date(Date.now() - 86400000), // Ayer
      total: 445,
      detalles: [
        { productoId: productos[1].id, cantidad: 1, precioUnitario: 350 },
        { productoId: productos[2].id, cantidad: 1, precioUnitario: 95 }
      ]
    },
    {
      clienteId: cliente3.id,
      fechaVenta: new Date(Date.now() - 172800000), // Hace 2 días
      total: 900,
      detalles: [{ productoId: productos[5].id, cantidad: 2, precioUnitario: 450 }]
    }
  ];

  for (const v of ventas) {
    const nuevaVenta = await prisma.venta.create({
      data: {
        clienteId: v.clienteId,
        fechaVenta: v.fechaVenta,
        total: v.total
      }
    });

    for (const d of v.detalles) {
      await prisma.detalleVenta.create({
        data: {
          ventaId: nuevaVenta.id,
          productoId: d.productoId,
          cantidad: d.cantidad,
          precioUnitario: d.precioUnitario
        }
      });
    }
  }

  console.log('Sembrado completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
