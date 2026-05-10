const express = require('express');
const controller = require('../controllers/stock.controller');

const router = express.Router();

router.get('/stock', controller.listStock);
router.get('/movimientos', controller.listMovimientos);
router.patch('/stock/:id', controller.updateStock);

module.exports = router;
