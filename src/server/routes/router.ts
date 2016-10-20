import * as express from 'express';
import * as path from 'path';

import { ApiRoutes } from './api';

let router: express.Router = express.Router();

router.use('/v1', ApiRoutes);


router.get('/*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../../../client/dist/index.html'));
});

export { router as Router };
