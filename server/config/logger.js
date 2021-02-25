const { database } = require('./keys');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const rTracer = require('cls-rtracer');

/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb').MongoDB;

const rTracerFormat = printf((info) => {
  const rid = rTracer.id()
  return rid
    ? `${info.timestamp} [${info.level}] [request-id:${rid}]: ${info.message}`
    : `${info.timestamp}: ${info.message}`
});

const rid1 = rTracer.id();
const customLevels = {
  levels: {
    emerg: 0,
    error: 1, 
    warn: 2, 
    info: 3, 
    http: 4,
    verbose: 5, 
    debug: 6
  },
  colors: {
    emerg: 'red'
  }
};
const logger = createLogger({
  levels: customLevels.levels,
  format: combine(
    timestamp(),
    rTracerFormat
  ),
  transports: [
    // new transports.MongoDB({
    //   db : database.url.logger,
    //   collection : 'logs',
    //   label : `RequestId: ${rid1}`, //Id showing undefined
    //   options : {
    //     useUnifiedTopology: true
    //   }
    // }),
    new transports.File({
      filename: `logs/request/requests-${new Date().toISOString().slice(0,10)}.log`
  })
  ]
});

module.exports.logger = logger;