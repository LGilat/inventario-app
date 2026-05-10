const { detallePedidoSchema } = require('../validators/detallePedido');
const detallePedidoService = require('../services/detallePedido.service');

async function createDetallePedido(req, res) {
  try {
    const result = detallePedidoSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<DetallePedido not found>]',
        error: result.error.message,
      });
    }

    const detallesPedido = await detallePedidoService.createDetallePedidoConStock(result.data);
    return res.status(201).json({
      ok: true,
      mensaje: 'Detalles de pedido creados, stock actualizado y movimientos registrados exitosamente',
      data: detallesPedido,
    });
  } catch (error) {
    console.error('Error durante la transacción de detalles de pedido:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error durante la transacción de detalles de pedido',
      error: error.message,
    });
  }
}

module.exports = {
  createDetallePedido,
};
