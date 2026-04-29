const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");
const { authenticate, requireAdmin } = require("../middleware/auth.middleware");

router.post("/", authenticate, requireAdmin, bookController.createBook);
router.get("/", authenticate, bookController.getAllBooks);
router.get("/:id", authenticate, bookController.getBookById);
router.put("/:id", authenticate, requireAdmin, bookController.updateBook);
router.delete("/:id", authenticate, requireAdmin, bookController.deleteBook);

module.exports = router;