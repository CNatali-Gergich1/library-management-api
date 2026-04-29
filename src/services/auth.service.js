const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository");

const signup = async (email, password) => {
  const existingUser = await userRepo.findUserByEmail(email);

  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    email,
    password: hashedPassword,
    role: "MEMBER",
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

const login = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  signup,
  login,
};