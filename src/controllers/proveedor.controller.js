const { proveedorSchema, proveedorPartialSchema } = require('../validators/proveedor');
const proveedorService = require('../services/proveedor.service');
const { parseId } = require('./utils');

async function createProveedor(req, res) {
  try {
    const result = proveedorSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<Proveedor not found>]',
        error: result.error.message,
      });
    }

    await proveedorService.createProveedor(result.data);
    return res.status(200).json({
      ok: true,
      mensaje: 'Proveedor creado',
    });
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al crear proveedor',
      error: error.message,
    });
  }
}

async function listProveedores(req, res) {
  try {
    const proveedores = await proveedorService.listProveedores();
    return res.status(200).json({
      ok: true,
      mensaje: 'Proveedores encontrados',
      items: proveedores,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener proveedores',
      error: error.message,
    });
  }
}

async function deleteProveedor(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de proveedor invalido',
    });
  }

  try {
    const proveedor = await proveedorService.getProveedorById(id);
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Proveedor no encontrado',
      });
    }

    await proveedorService.deleteProveedor(id);
    try {
      const proveedores = await proveedorService.listProveedores();
      return res.status(200).json({
        ok: true,
        mensaje: 'Proveedor eliminado',
        items: proveedores,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al obtener proveedores',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar proveedor',
      error: error.message,
    });
  }
}

async function updateProveedor(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de proveedor invalido',
    });
  }

  try {
    const result = proveedorPartialSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<Proveedor not found>]',
        error: result.error.message,
      });
    }

    const proveedor = await proveedorService.updateProveedor(id, result.data);
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Proveedor no encontrado',
      });
    }

    try {
      const proveedores = await proveedorService.listProveedores();
      return res.status(200).json({
        ok: true,
        mensaje: 'Proveedor actualizado correctamente',
        items: proveedores,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Proveedor actualizado pero no se pudo obtener la lista de proveedores',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el proveedor',
      error: error.message,
    });
  }
}

module.exports = {
  createProveedor,
  listProveedores,
  deleteProveedor,
  updateProveedor,
};
