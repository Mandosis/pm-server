import * as winston from 'winston';
import * as socket from 'socket.io';
import * as http from 'http';

const ioJwt = require('socketio-jwt');


let io: SocketIO.Server;

export function IOListen(server: any) {
    io = socket(server);
}


export function IOStartAPI () {
    io.sockets
        .on('connection', ioJwt.authorize({
            secret: process.env.SECRET,
            timeout: 15000
        }))
        .on('authenticated', (socket: any) => {
            // Add Events for authenticated users
            winston.info(`${socket.decoded_token.email} connected`);
        })
}


