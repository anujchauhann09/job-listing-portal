const express = require("express");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");
const exceptionHandler = require('./middlewares/exception.handler');
const { requestIdMiddleware, httpLogger } = require('./middlewares/http-logger.middleware');
const corsOptions = require('./config/cors.config');
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestIdMiddleware);
app.use(httpLogger);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/v1", routes);

app.use(exceptionHandler);

module.exports = app;
