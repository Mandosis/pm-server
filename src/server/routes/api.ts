import * as express from 'express';

const ioJwt = require('socketio-jwt');

import { IO } from '../socket';

let router: any = express.Router();

router.post('/login', (req: any, res: any) => {

});

export { router as ApiRoutes };
