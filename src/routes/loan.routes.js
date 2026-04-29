const express = require("express");
const router = express.Router();

const loanController = require("../controllers/loan.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, loanController.createLoan);
router.get("/", authenticate, loanController.getLoans);
router.get("/:id", authenticate, loanController.getLoanById);
router.put("/:id", authenticate, loanController.updateLoan);
router.delete("/:id", authenticate, loanController.deleteLoan);

module.exports = router;