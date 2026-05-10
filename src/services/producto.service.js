const prisma = require('../db/prisma');

async function createProducto(data) {
  return prisma.producto.create({ data });
}

async function listProductos() {
  return prisma.producto.findMany();
}

async function getProductoById(id) {
  return prisma.producto.findUnique({ where: { id } });
}

async function updateProducto(id, data) {
  return prisma.producto.update({ where: { id }, data });
}

async function deleteProducto(id) {
  return prisma.producto.delete({ where: { id } });
}

module.exports = {
  createProducto,
  listProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};
