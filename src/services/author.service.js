const authorRepo = require("../repositories/author.repository");

const validateAuthorData = (data) => {
  const { firstName, lastName } = data;

  if (!firstName || !lastName) {
    throw new Error("INVALID_AUTHOR_DATA");
  }
};

const createAuthor = async (data) => {
  validateAuthorData(data);
  return authorRepo.createAuthor(data);
};

const getAllAuthors = () => {
  return authorRepo.getAllAuthors();
};

const getAuthorById = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  const author = await authorRepo.getAuthorById(id);

  if (!author) {
    throw new Error("AUTHOR_NOT_FOUND");
  }

  return author;
};

const updateAuthor = async (id, data) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  validateAuthorData(data);

  const existingAuthor = await authorRepo.getAuthorById(id);

  if (!existingAuthor) {
    throw new Error("AUTHOR_NOT_FOUND");
  }

  return authorRepo.updateAuthor(id, data);
};

const deleteAuthor = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  const existingAuthor = await authorRepo.getAuthorById(id);

  if (!existingAuthor) {
    throw new Error("AUTHOR_NOT_FOUND");
  }

  return authorRepo.deleteAuthor(id);
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};