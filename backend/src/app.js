const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const exceptionHandler = require('./middlewares/exception.handler');
const { requestIdMiddleware, httpLogger } = require('./middlewares/http-logger.middleware');
const validate = require('./middlewares/validate.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use(requestIdMiddleware);
app.use(httpLogger);

app.use(validate);

app.use(exceptionHandler);

module.exports = app;
