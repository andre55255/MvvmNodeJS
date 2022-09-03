const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

const accountRouter = require("./routes/accountRoutes");

app.use(express.json());
app.use(cors());

app.use("/account", accountRouter);

module.exports = { app };