const prisma = require('../db/prisma');

async function createCliente(data) {
  return prisma.cliente.create({ data });
}

async function listClientes() {
  return prisma.cliente.findMany();
}

async function getClienteById(id) {
  return prisma.cliente.findUnique({ where: { id } });
}

async function updateCliente(id, data) {
  return prisma.cliente.update({ where: { id }, data });
}

async function deleteCliente(id) {
  return prisma.cliente.delete({ where: { id } });
}

module.exports = {
  createCliente,
  listClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
};
