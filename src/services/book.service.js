const bookRepo = require("../repositories/book.repository");

const validateBookData = (data) => {
  const { title, isbn, publishedYear, genre, copiesAvailable } = data;

  if (!title || !isbn || !publishedYear || !genre || copiesAvailable === undefined) {
    throw new Error("INVALID_BOOK_DATA");
  }

  if (
    typeof publishedYear !== "number" ||
    typeof copiesAvailable !== "number" ||
    publishedYear <= 0 ||
    copiesAvailable < 0
  ) {
    throw new Error("INVALID_BOOK_DATA");
  }
};

const createBook = async (data) => {
  validateBookData(data);

  const existingBook = await bookRepo.getBookByIsbn(data.isbn);

  if (existingBook) {
    throw new Error("ISBN_EXISTS");
  }

  return bookRepo.createBook(data);
};

const getAllBooks = () => {
  return bookRepo.getAllBooks();
};

const getBookById = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  const book = await bookRepo.getBookById(id);

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return book;
};

const updateBook = async (id, data) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  validateBookData(data);

  const existingBook = await bookRepo.getBookById(id);

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  const isbnOwner = await bookRepo.getBookByIsbn(data.isbn);

  if (isbnOwner && isbnOwner.id !== id) {
    throw new Error("ISBN_EXISTS");
  }

  return bookRepo.updateBook(id, data);
};

const deleteBook = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }

  const existingBook = await bookRepo.getBookById(id);

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return bookRepo.deleteBook(id);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};