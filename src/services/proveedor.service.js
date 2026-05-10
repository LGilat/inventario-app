const prisma = require('../db/prisma');

async function createProveedor(data) {
  return prisma.proveedor.create({ data });
}

async function listProveedores() {
  return prisma.proveedor.findMany();
}

async function getProveedorById(id) {
  return prisma.proveedor.findUnique({ where: { id } });
}

async function updateProveedor(id, data) {
  return prisma.proveedor.update({ where: { id }, data });
}

async function deleteProveedor(id) {
  return prisma.proveedor.delete({ where: { id } });
}

module.exports = {
  createProveedor,
  listProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
};
