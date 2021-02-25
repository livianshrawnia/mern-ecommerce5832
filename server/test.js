const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const rTracer = require('cls-rtracer');

const rTracerFormat = printf((info) => {
  const rid = rTracer.id()
  return rid
    ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
    : `${info.timestamp}: ${info.message}`
});

const logger = createLogger({
  format: combine(
    timestamp(),
    rTracerFormat
  ),
  transports: [new transports.Console({ level: 'info' })]
});

logger.info('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');