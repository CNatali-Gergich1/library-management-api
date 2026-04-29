const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author.controller");
const { authenticate, requireAdmin } = require("../middleware/auth.middleware");

router.post("/", authenticate, requireAdmin, authorController.createAuthor);
router.get("/", authenticate, authorController.getAllAuthors);
router.get("/:id", authenticate, authorController.getAuthorById);
router.put("/:id", authenticate, requireAdmin, authorController.updateAuthor);
router.delete("/:id", authenticate, requireAdmin, authorController.deleteAuthor);

module.exports = router;