const { productoSchema, productoPartialSchema } = require('../validators/producto');
const productoService = require('../services/producto.service');
const { parseId } = require('./utils');

async function createProducto(req, res) {
  try {
    const result = productoSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<Producto not found>]',
        error: result.error.message,
      });
    }

    await productoService.createProducto(result.data);
    return res.status(200).json({
      ok: true,
      mensaje: 'Producto creado correctamente',
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el producto',
      error: error.message,
    });
  }
}

async function listProductos(req, res) {
  try {
    const productos = await productoService.listProductos();
    return res.status(200).json({
      ok: true,
      mensaje: 'Productos encontrados',
      items: productos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener productos',
      error: error.message,
    });
  }
}

async function deleteProducto(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de producto invalido',
    });
  }

  try {
    const producto = await productoService.getProductoById(id);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado',
      });
    }

    await productoService.deleteProducto(id);
    try {
      const productos = await productoService.listProductos();
      return res.status(200).json({
        ok: true,
        mensaje: 'Producto eliminado',
        items: productos,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Producto eliminado pero no se pudo obtener la lista de productos',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar producto',
      error: error.message,
    });
  }
}

async function updateProducto(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Id de producto invalido',
    });
  }

  try {
    const result = productoPartialSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error en los datos introducidos [<Producto not found>]',
        error: result.error.message,
      });
    }

    const producto = await productoService.updateProducto(id, result.data);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado',
      });
    }

    try {
      const productos = await productoService.listProductos();
      return res.status(200).json({
        ok: true,
        mensaje: 'Producto actualizado correctamente',
        items: productos,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Producto actualizado pero no se pudo obtener la lista de productos',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el producto',
      error: error.message,
    });
  }
}

module.exports = {
  createProducto,
  listProductos,
  deleteProducto,
  updateProducto,
};
