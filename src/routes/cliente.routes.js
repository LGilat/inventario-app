const express = require('express');
const controller = require('../controllers/cliente.controller');

const router = express.Router();

router.post('/cliente', controller.createCliente);
router.get('/cliente', controller.listClientes);
router.delete('/cliente/:id', controller.deleteCliente);
router.patch('/cliente/:id', controller.updateCliente);

module.exports = router;
