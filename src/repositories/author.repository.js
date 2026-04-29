const prisma = require("../config/prisma");

const createAuthor = (data) => {
  return prisma.author.create({ data });
};

const getAllAuthors = () => {
  return prisma.author.findMany({
    orderBy: { id: "asc" },
  });
};

const getAuthorById = (id) => {
  return prisma.author.findUnique({
    where: { id },
  });
};

const updateAuthor = (id, data) => {
  return prisma.author.update({
    where: { id },
    data,
  });
};

const deleteAuthor = async (id) => {
  return prisma.$transaction(async (tx) => {
    await tx.bookAuthor.deleteMany({
      where: { authorId: id },
    });

    return tx.author.delete({
      where: { id },
    });
  });
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};