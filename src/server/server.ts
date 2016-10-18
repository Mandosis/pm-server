import * as dotenv from 'dotenv';
dotenv.config();

import * as express      from 'express';
import * as winston      from 'winston';
import * as helmet       from 'helmet';
import * as path         from 'path';
import * as bodyParser   from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { initializeDatabase } from './database';
import { Router }             from './routes/router';

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
app.use(bodyParser.json());
app.use(helmet());

/**
 * Set directories to serve static assets from
 */
let publicPath: string = path.join(__dirname, '../public');
app.use(express.static(publicPath));

/**
 * Set routes
 */
 app.use('/', Router);

let server = app.listen(process.env.PORT || 3000, () => {
  let port = server.address().port;
  winston.info(`Listening at http://localhost:${port}`);
});
