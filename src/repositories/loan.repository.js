const prisma = require("../config/prisma");

const createLoan = (data) => {
  return prisma.loan.create({ data });
};

const getAllLoans = () => {
  return prisma.loan.findMany();
};

const getLoansByUserId = (userId) => {
  return prisma.loan.findMany({
    where: { userId },
  });
};

const getLoanById = (id) => {
  return prisma.loan.findUnique({
    where: { id },
  });
};

const updateLoan = (id, data) => {
  return prisma.loan.update({
    where: { id },
    data,
  });
};

const deleteLoan = (id) => {
  return prisma.loan.delete({
    where: { id },
  });
};

module.exports = {
  createLoan,
  getAllLoans,
  getLoansByUserId,
  getLoanById,
  updateLoan,
  deleteLoan,
};