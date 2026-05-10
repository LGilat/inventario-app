const prisma = require('../db/prisma');

async function createVentaCompleta({ clienteId, fechaVenta, total, lineasCompra }) {
  return prisma.$transaction(async (tx) => {
    const venta = await tx.venta.create({
      data: {
        clienteId,
        fechaVenta,
        total,
      },
    });

    for (const linea of lineasCompra) {
      await tx.detalleVenta.create({
        data: {
          ventaId: venta.id,
          productoId: linea.productoId,
          cantidad: linea.cantidad,
          precioUnitario: linea.precioUnitario,
        },
      });

      const stock = await tx.stock.findFirst({
        where: { productoId: linea.productoId },
      });

      if (!stock || stock.cantidad < linea.cantidad) {
        throw new Error(`Stock insuficiente para el producto ${linea.productoId}`);
      }

      await tx.stock.update({
        where: { id: stock.id },
        data: {
          cantidad: { decrement: linea.cantidad },
          fechaActualizacion: new Date(),
        },
      });

      await tx.movimientoStock.create({
        data: {
          productoId: linea.productoId,
          cantidad: -linea.cantidad,
          tipoMovimiento: 'Salida',
          fechaMovimiento: new Date(),
        },
      });

      if (stock.cantidad - linea.cantidad < 10) {
        console.log(`¡Alerta! Stock bajo para el producto ${linea.productoId}`);
      }
    }

    return venta;
  });
}

async function listVentas() {
  return prisma.venta.findMany({
    include: {
      detalleVenta: true,
      cliente: true,
    },
  });
}

module.exports = {
  createVentaCompleta,
  listVentas,
};
