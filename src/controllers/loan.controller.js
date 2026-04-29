const loanService = require("../services/loan.service");

const handleLoanError = (error, res) => {
  if (error.message === "INVALID_LOAN_DATA" || error.message === "INVALID_ID") {
    return res.status(400).json({ message: "Invalid request data" });
  }

  if (error.message === "BOOK_NOT_FOUND") {
    return res.status(404).json({ message: "Book not found" });
  }

  if (error.message === "LOAN_NOT_FOUND") {
    return res.status(404).json({ message: "Loan not found" });
  }

  if (error.message === "NO_COPIES_AVAILABLE") {
    return res.status(400).json({ message: "No copies available" });
  }

  if (error.message === "FORBIDDEN") {
    return res.status(403).json({ message: "Not allowed" });
  }

  return res.status(500).json({ message: "Internal server error" });
};

const createLoan = async (req, res) => {
  try {
    const loan = await loanService.createLoan(req.user.id, req.body);
    res.status(201).json(loan);
  } catch (error) {
    handleLoanError(error, res);
  }
};

const getLoans = async (req, res) => {
  try {
    const loans = await loanService.getLoans(req.user);
    res.status(200).json(loans);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLoanById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const loan = await loanService.getLoanById(id, req.user);
    res.status(200).json(loan);
  } catch (error) {
    handleLoanError(error, res);
  }
};

const updateLoan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const loan = await loanService.updateLoan(id, req.user, req.body);
    res.status(200).json(loan);
  } catch (error) {
    handleLoanError(error, res);
  }
};

const deleteLoan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const loan = await loanService.deleteLoan(id, req.user);
    res.status(200).json(loan);
  } catch (error) {
    handleLoanError(error, res);
  }
};

module.exports = {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
};