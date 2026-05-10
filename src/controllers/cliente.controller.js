const { clienteSchema, clientePartialSchema } = require('../validators/cliente');
const clienteService = require('../services/cliente.service');
const { parseId } = require('./utils');

async function createCliente(req, res) {
  try {
    const result = clienteSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<Cliente not found>]',
        error: result.error.message,
      });
    }

    await clienteService.createCliente(result.data);
    return res.status(200).json({
      ok: true,
      mensaje: 'Cliente creado correctamente',
    });
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el cliente',
      error: error.message,
    });
  }
}

async function listClientes(req, res) {
  try {
    const clientes = await clienteService.listClientes();
    return res.status(200).json({
      ok: true,
      mensaje: 'Clientes encontrados',
      items: clientes,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener clientes',
      error: error.message,
    });
  }
}

async function deleteCliente(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de cliente invalido',
    });
  }

  try {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Cliente no encontrado',
      });
    }

    await clienteService.deleteCliente(id);

    try {
      const clientes = await clienteService.listClientes();
      return res.status(200).json({
        ok: true,
        mensaje: 'Cliente eliminado correctamente',
        items: clientes,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Cliente eliminado pero no se pudo obtener la lista de clientes',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el cliente',
      error: error.message,
    });
  }
}

async function updateCliente(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de cliente invalido',
    });
  }

  try {
    const result = clientePartialSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<Cliente not found>]',
        error: result.error.message,
      });
    }

    const cliente = await clienteService.updateCliente(id, result.data);
    if (!cliente) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Cliente no encontrado',
      });
    }

    try {
      const clientes = await clienteService.listClientes();
      return res.status(200).json({
        ok: true,
        mensaje: 'Cliente actualizado correctamente',
        items: clientes,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Cliente actualizado pero no se pudo obtener la lista de clientes',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el cliente',
      error: error.message,
    });
  }
}

module.exports = {
  createCliente,
  listClientes,
  deleteCliente,
  updateCliente,
};
