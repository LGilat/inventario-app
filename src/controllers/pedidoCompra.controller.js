const { pedidoCompraSchema } = require('../validators/pedidoCompra');
const pedidoCompraService = require('../services/pedidoCompra.service');
const { parseId } = require('./utils');

async function createPedidoCompra(req, res) {
  try {
    const { proveedorId, fechaPedido, detalles } = req.body;
    
    // Validación manual rápida (para no depender solo del validador antiguo)
    if (!proveedorId || !detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Datos inválidos. Se requiere proveedorId y detalles (array).',
      });
    }

    const pedido = await pedidoCompraService.createPedidoCompra({
      proveedorId,
      fechaPedido: fechaPedido || new Date(),
      estado: 'Completado', // Asumimos recepción inmediata por simplicidad
      detalles
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Pedido de compra registrado y stock actualizado.',
      pedido
    });
  } catch (error) {
    console.error('Error al crear el pedido de compra:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al procesar la compra',
      error: error.message,
    });
  }
}

async function listPedidosCompra(req, res) {
  try {
    const pedidos = await pedidoCompraService.listPedidosCompra();
    return res.status(200).json({
      ok: true,
      mensaje: 'Pedidos de compra obtenidos correctamente',
      items: pedidos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los pedidos de compra',
      error: error.message,
    });
  }
}

async function deletePedidoCompra(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de pedido de compra invalido',
    });
  }

  try {
    const pedido = await pedidoCompraService.getPedidoCompraById(id);
    if (!pedido) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Pedido de compra no encontrado',
      });
    }

    await pedidoCompraService.deletePedidoCompra(id);
    const pedidos = await pedidoCompraService.listPedidosCompra();
    return res.status(200).json({
      ok: true,
      mensaje: 'Pedido de compra eliminado correctamente',
      items: pedidos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el pedido de compra',
      error: error.message,
    });
  }
}

module.exports = {
  createPedidoCompra,
  listPedidosCompra,
  deletePedidoCompra,
};
