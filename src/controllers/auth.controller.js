const authService = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.signup(email, password);

    res.status(201).json({ user });
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json(result);
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};