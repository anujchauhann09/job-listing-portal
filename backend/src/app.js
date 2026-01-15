const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const requestLogger = require("./middlewares/request-logger.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
