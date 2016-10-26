import * as express from 'express';
import * as path from 'path';

import { ApiRoutes } from './api';

const proxy = require('express-http-proxy');

let router: express.Router = express.Router();

router.use('/v1', ApiRoutes);

router.get('/*',proxy(('localhost:4200'), {
  forwardPath: (req: express.Request, res: express.Response) => {
    return require('url').parse(req.url).path;
  }
}))

export { router as Router };
