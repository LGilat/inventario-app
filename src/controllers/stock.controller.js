const stockService = require("../services/stock.service");

async function listStock(req, res) {
  try {
    const stock = await stockService.listStock();
    return res.status(200).json({
      ok: true,
      mensaje: "Stock obtenido correctamente",
      items: stock,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener el stock",
      error: error.message,
    });
  }
}

async function listMovimientos(req, res) {
  try {
    const movimientos = await stockService.listMovimientos();
    return res.status(200).json({
      ok: true,
      mensaje: "Movimientos obtenidos correctamente",
      items: movimientos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener los movimientos",
      error: error.message,
    });
  }
}

async function updateStock(req, res) {
  const { id } = req.params;
  const { cantidad, motivo } = req.body;
  try {
    const stock = await stockService.updateStock(
      parseInt(id),
      parseInt(cantidad),
      motivo,
    );
    return res.status(200).json({
      ok: true,
      mensaje: "Stock ajustado correctamente",
      item: stock,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al ajustar stock",
      error: error.message,
    });
  }
}

module.exports = {
  listStock,
  listMovimientos,
  updateStock,
};
