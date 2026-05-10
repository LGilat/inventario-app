const express = require('express');
const controller = require('../controllers/detallePedido.controller');

const router = express.Router();

router.post('/detallepedido', controller.createDetallePedido);

module.exports = router;
