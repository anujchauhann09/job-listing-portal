const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, printf } = format;

const isProduction = process.env.NODE_ENV === 'production';

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
});

const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    isProduction ? json() : devFormat
  ),
  transports: [
    new transports.File({
      filename: 'src/logs/error.log',
      level: 'error'
    }),
    new transports.File({
      filename: 'src/logs/combined.log'
    })
  ],
  exitOnError: false
});

// console logging only in dev
if (!isProduction) {
  logger.add(
    new transports.Console({
      format: combine(
        timestamp(),
        devFormat
      )
    })
  );
}

module.exports = logger;
