const express = require('express');
const controller = require('../controllers/producto.controller');

const router = express.Router();

router.post('/producto', controller.createProducto);
router.get('/producto', controller.listProductos);
router.delete('/producto/:id', controller.deleteProducto);
router.patch('/producto/:id', controller.updateProducto);

module.exports = router;
