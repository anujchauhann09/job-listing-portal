const app = require("./app");
const { port } = require("./config/env");
const logger = require("./config/logger");

app.listen(port, () => {
  logger.info(`Backend server running on port ${port}`);
});
