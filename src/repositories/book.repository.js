const prisma = require("../config/prisma");

const createBook = (data) => {
  return prisma.book.create({ data });
};

const getAllBooks = () => {
  return prisma.book.findMany({
    orderBy: { id: "asc" },
  });
};

const getBookById = (id) => {
  return prisma.book.findUnique({
    where: { id },
  });
};

const getBookByIsbn = (isbn) => {
  return prisma.book.findUnique({
    where: { isbn },
  });
};

const updateBook = (id, data) => {
  return prisma.book.update({
    where: { id },
    data,
  });
};

const deleteBook = async (id) => {
  return prisma.$transaction(async (tx) => {
    await tx.bookAuthor.deleteMany({
      where: { bookId: id },
    });

    await tx.loan.deleteMany({
      where: { bookId: id },
    });

    return tx.book.delete({
      where: { id },
    });
  });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  getBookByIsbn,
  updateBook,
  deleteBook,
};