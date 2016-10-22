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

// router.get('/*', (req: express.Request, res: express.Response) => {
//   res.sendFile(path.join(__dirname, '../../../../client/dist/index.html'));
// });

export { router as Router };
