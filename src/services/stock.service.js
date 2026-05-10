const prisma = require('../db/prisma');

async function listStock() {
  return prisma.stock.findMany({
    include: { producto: true },
  });
}

async function listMovimientos() {
  return prisma.movimientoStock.findMany({
    include: { producto: true },
    orderBy: { fechaMovimiento: 'desc' },
  });
}

async function updateStock(id, nuevaCantidad, motivo) {
  return prisma.$transaction(async (tx) => {
    const stockActual = await tx.stock.findUnique({ where: { id } });
    if (!stockActual) throw new Error('Registro de stock no encontrado');

    const diferencia = nuevaCantidad - stockActual.cantidad;
    
    // Actualizar el stock
    const stockActualizado = await tx.stock.update({
      where: { id },
      data: { 
        cantidad: nuevaCantidad,
        fechaActualizacion: new Date()
      }
    });

    // Registrar el movimiento de ajuste
    if (diferencia !== 0) {
      await tx.movimientoStock.create({
        data: {
          productoId: stockActual.productoId,
          cantidad: diferencia,
          tipoMovimiento: diferencia > 0 ? 'Entrada (Ajuste)' : 'Salida (Ajuste)',
          fechaMovimiento: new Date()
        }
      });
    }

    return stockActualizado;
  });
}

module.exports = {
  listStock,
  listMovimientos,
  updateStock,
};
