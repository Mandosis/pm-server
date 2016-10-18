import * as winston from 'winston';

import { IO } from './socket';

const ioJwt = require('socketio-jwt');

IO.sockets
    .on('connection', ioJwt.authorize({
        secret: process.env.SECRET,
        timeout: 15000
    }))
    .on('authenticated', (socket: any) => {
        // Add Events for authenticated users
        winston.info(`${socket.decoded_token.name} connected`);
    })