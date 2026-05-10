const prisma = require('../db/prisma');

async function createDetallePedidoConStock(detalles) {
  return prisma.$transaction(async (tx) => {
    const createdDetails = await tx.detallePedidoCompra.createMany({
      data: detalles,
    });

    await Promise.all(
      detalles.map(async (detalle) => {
        const stockExists = await tx.stock.findFirst({
          where: { productoId: detalle.productoId },
        });

        if (stockExists) {
          await tx.stock.update({
            where: { id: stockExists.id },
            data: {
              cantidad: { increment: detalle.cantidad },
              fechaActualizacion: new Date(),
            },
          });
        } else {
          await tx.stock.create({
            data: {
              productoId: detalle.productoId,
              cantidad: detalle.cantidad,
              ubicacion: 'Almacen Principal',
              fechaActualizacion: new Date(),
            },
          });
        }

        await tx.movimientoStock.create({
          data: {
            productoId: detalle.productoId,
            cantidad: detalle.cantidad,
            tipoMovimiento: 'Entrada',
            fechaMovimiento: new Date(),
          },
        });
      })
    );

    return createdDetails;
  });
}

module.exports = {
  createDetallePedidoConStock,
};
