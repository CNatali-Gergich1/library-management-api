const loanRepo = require("../repositories/loan.repository");
const prisma = require("../config/prisma");

const createLoan = async (userId, data) => {
  const { bookId, dueDate } = data;

  if (!bookId || !dueDate) {
    throw new Error("INVALID_LOAN_DATA");
  }

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  if (book.copiesAvailable <= 0) {
    throw new Error("NO_COPIES_AVAILABLE");
  }

  // decrement copies
  await prisma.book.update({
    where: { id: bookId },
    data: { copiesAvailable: book.copiesAvailable - 1 },
  });

  return loanRepo.createLoan({
    userId,
    bookId,
    loanDate: new Date(),
    dueDate: new Date(dueDate),
    status: "ACTIVE",
  });
};

const getLoans = async (user) => {
  if (user.role === "ADMIN") {
    return loanRepo.getAllLoans();
  }

  return loanRepo.getLoansByUserId(user.id);
};

const getLoanById = async (id, user) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  const loan = await loanRepo.getLoanById(id);

  if (!loan) {
    throw new Error("LOAN_NOT_FOUND");
  }

  if (user.role !== "ADMIN" && loan.userId !== user.id) {
    throw new Error("FORBIDDEN");
  }

  return loan;
};

const updateLoan = async (id, user, data) => {
  const loan = await getLoanById(id, user);

  if (user.role !== "ADMIN" && loan.userId !== user.id) {
    throw new Error("FORBIDDEN");
  }

  const updateData = {};

  if (data.dueDate) {
    updateData.dueDate = new Date(data.dueDate);
  }

  if (data.returnDate) {
    updateData.returnDate = new Date(data.returnDate);
  }

  if (data.status) {
    updateData.status = data.status;
  }

  return loanRepo.updateLoan(id, updateData);
};

const deleteLoan = async (id, user) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  const loan = await loanRepo.getLoanById(id);

  if (!loan) {
    throw new Error("LOAN_NOT_FOUND");
  }

  return loanRepo.deleteLoan(id);
};

module.exports = {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
};