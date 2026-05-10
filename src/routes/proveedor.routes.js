const express = require('express');
const controller = require('../controllers/proveedor.controller');

const router = express.Router();

router.post('/proveedor', controller.createProveedor);
router.get('/proveedor', controller.listProveedores);
router.delete('/proveedor/:id', controller.deleteProveedor);
router.patch('/proveedor/:id', controller.updateProveedor);

module.exports = router;
