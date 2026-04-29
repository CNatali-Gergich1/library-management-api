const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Library Management API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

module.exports = app;