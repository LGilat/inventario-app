const express = require('express');
const controller = require('../controllers/venta.controller');

const router = express.Router();

router.post('/venta', controller.createVenta);
router.get('/venta', controller.listVentas);

module.exports = router;
