import * as express from 'express';

import { ApiRoutes } from './api';

let router: any = express.Router();

router.use('/v1', ApiRoutes);

export { router as Router };
