const express = require('express');
const controller = require('../controllers/pedidoCompra.controller');

const router = express.Router();

router.post('/pedidocompra', controller.createPedidoCompra);
router.get('/pedidocompra', controller.listPedidosCompra);
router.delete('/pedidocompra/:id', controller.deletePedidoCompra);

module.exports = router;
