import * as socket from 'socket.io';
import * as http   from 'http';

let io: SocketIO.Server;

export function IOListen(app: any) {
    let server = http.createServer(app);
    io = socket(server);
}

export { io as IO };
