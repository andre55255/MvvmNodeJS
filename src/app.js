const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

const accountRouter = require("./routes/accountRoutes");
const userRouter = require("./routes/userRoutes");

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/account", accountRouter);
app.use("/user", userRouter);

module.exports = { app };