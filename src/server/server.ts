import * as dotenv from 'dotenv';
dotenv.config();

import * as express      from 'express';
import * as http         from 'http';
import * as socket       from 'socket.io';
import * as winston      from 'winston';
import * as helmet       from 'helmet';
import * as path         from 'path';
import * as bodyParser   from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { initializeDatabase }   from './database';
import { Router }               from './routes/router';
import { IOListen, IOStartAPI } from './socket';
import { StartSocketAPI }       from './socket-api';
let app = express();

/**
 * Configure Winston Logging
 */
winston.addColors({
  debug: 'green',
  info: 'cyan',
  silly: 'magenta',
  warn: 'yellow',
  error: 'red'
});

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: process.env.LOG_LEVEL,
  colorize: true
})


/**
 * Initialize connection to database
 */
initializeDatabase();

/**
 * Configure Middleware
 */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

/**
 * Set directories to serve static assets from
 */
app.use(express.static(path.join(__dirname, '../../../client/dist')));
winston.debug(path.join(__dirname, '../../../client/dist'));

/**
 * Set routes
 */
app.use('/', Router);

/**
 * Create HTTP Server
 */
let httpServer = http.createServer(app);

/**
 * Create and start Socket.io server
 */
IOListen(httpServer);
IOStartAPI();


/**
 * Start HTTP Server
 */
let listenServer = httpServer.listen(process.env.PORT || 3000, () => {
  let port = listenServer.address().port;
  winston.info(`Listening at http://localhost:${port}`);
});
