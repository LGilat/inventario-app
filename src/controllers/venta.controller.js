const { ventaCompletaSchema } = require('../validators/venta');
const ventaService = require('../services/venta.service');

async function createVenta(req, res) {
  try {
    const result = ventaCompletaSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos',
        error: result.error.message,
      });
    }

    const { clienteId, fechaVenta, total, lineasCompra } = result.data;
    const ventaCompleta = await ventaService.createVentaCompleta({
      clienteId,
      fechaVenta,
      total,
      lineasCompra,
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Venta procesada correctamente',
      venta: ventaCompleta,
    });
  } catch (error) {
    console.error('Error al procesar la venta:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al procesar la venta',
      error: error.message,
    });
  }
}

async function listVentas(req, res) {
  try {
    const ventas = await ventaService.listVentas();
    return res.status(200).json({
      ok: true,
      mensaje: 'Ventas obtenidas correctamente',
      items: ventas,
    });
  } catch (error) {
    console.error('Error al listar ventas:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al listar ventas',
      error: error.message,
    });
  }
}

module.exports = {
  createVenta,
  listVentas,
};
