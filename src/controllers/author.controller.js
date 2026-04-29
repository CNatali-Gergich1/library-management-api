const authorService = require("../services/author.service");

const handleAuthorError = (error, res) => {
  if (error.message === "INVALID_ID" || error.message === "INVALID_AUTHOR_DATA") {
    return res.status(400).json({ message: "Invalid request data" });
  }

  if (error.message === "AUTHOR_NOT_FOUND") {
    return res.status(404).json({ message: "Author not found" });
  }

  return res.status(500).json({ message: "Internal server error" });
};

const createAuthor = async (req, res) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    handleAuthorError(error, res);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const author = await authorService.getAuthorById(id);
    res.status(200).json(author);
  } catch (error) {
    handleAuthorError(error, res);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const author = await authorService.updateAuthor(id, req.body);
    res.status(200).json(author);
  } catch (error) {
    handleAuthorError(error, res);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const author = await authorService.deleteAuthor(id);
    res.status(200).json(author);
  } catch (error) {
    handleAuthorError(error, res);
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};