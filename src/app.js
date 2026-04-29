const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const authorRoutes = require("./routes/author.routes");
const loanRoutes = require("./routes/loan.routes");

const swaggerDocument = YAML.load("./openapi.yaml");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Library Management API is running",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/loans", loanRoutes);

module.exports = app;