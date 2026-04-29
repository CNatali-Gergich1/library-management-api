const bookService = require("../services/book.service");

const handleBookError = (error, res) => {
  if (error.message === "INVALID_ID" || error.message === "INVALID_BOOK_DATA") {
    return res.status(400).json({ message: "Invalid request data" });
  }

  if (error.message === "BOOK_NOT_FOUND") {
    return res.status(404).json({ message: "Book not found" });
  }

  if (error.message === "ISBN_EXISTS") {
    return res.status(409).json({ message: "ISBN already exists" });
  }

  return res.status(500).json({ message: "Internal server error" });
};

const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    handleBookError(error, res);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await bookService.getBookById(id);
    res.status(200).json(book);
  } catch (error) {
    handleBookError(error, res);
  }
};

const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await bookService.updateBook(id, req.body);
    res.status(200).json(book);
  } catch (error) {
    handleBookError(error, res);
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await bookService.deleteBook(id);
    res.status(200).json(book);
  } catch (error) {
    handleBookError(error, res);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};