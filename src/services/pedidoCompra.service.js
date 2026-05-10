const prisma = require('../db/prisma');

async function createPedidoCompra(data) {
  const { proveedorId, fechaPedido, estado, detalles } = data;

  return prisma.$transaction(async (tx) => {
    // 1. Crear el Pedido de Compra
    const pedido = await tx.pedidoCompra.create({
      data: {
        proveedorId,
        fechaPedido: new Date(fechaPedido), // Asegurar que sea fecha válida
        estado,
      },
    });

    // 2. Procesar cada detalle del pedido
    for (const detalle of detalles) {
      // Crear Detalle de Pedido
      await tx.detallePedidoCompra.create({
        data: {
          pedidoCompraId: pedido.id,
          productoId: detalle.productoId,
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precioUnitario,
        },
      });

      // 3. Actualizar Stock (Incrementar)
      const stock = await tx.stock.findFirst({
        where: { productoId: detalle.productoId },
      });

      if (stock) {
        await tx.stock.update({
          where: { id: stock.id },
          data: {
            cantidad: { increment: detalle.cantidad },
            fechaActualizacion: new Date(),
          },
        });
      } else {
        // Crear stock si no existe
        await tx.stock.create({
          data: {
            productoId: detalle.productoId,
            cantidad: detalle.cantidad,
            ubicacion: 'Recepción',
            fechaActualizacion: new Date(),
          },
        });
      }

      // 4. Registrar Movimiento de Stock (Entrada)
      await tx.movimientoStock.create({
        data: {
          productoId: detalle.productoId,
          cantidad: detalle.cantidad,
          tipoMovimiento: 'Entrada (Compra)',
          fechaMovimiento: new Date(),
        },
      });
    }

    return pedido;
  });
}

async function listPedidosCompra() {
  return prisma.pedidoCompra.findMany({
    include: {
      proveedor: true,
      detallePedidoCompra: {
        include: { producto: true },
      },
    },
    orderBy: { fechaPedido: 'desc' },
  });
}

async function getPedidoCompraById(id) {
  return prisma.pedidoCompra.findUnique({ where: { id } });
}

async function deletePedidoCompra(id) {
  return prisma.pedidoCompra.delete({ where: { id } });
}

module.exports = {
  createPedidoCompra,
  listPedidosCompra,
  getPedidoCompraById,
  deletePedidoCompra,
};
