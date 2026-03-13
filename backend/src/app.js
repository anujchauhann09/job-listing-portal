const express = require("express");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");
const exceptionHandler = require('./middlewares/exception.handler');
const { requestIdMiddleware, httpLogger } = require('./middlewares/http-logger.middleware');
const { authenticate } = require('./middlewares/auth.middleware');
const corsOptions = require('./config/cors.config');
const cookieParser = require("cookie-parser");
// const validate = require('./middlewares/validate.middleware');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());    
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/v1", routes);

app.use(authenticate);
app.use(requestIdMiddleware);
app.use(httpLogger);

// app.use(validate);

app.use(exceptionHandler);

module.exports = app;
