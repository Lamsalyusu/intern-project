import {Server,Socket} from 'socket.io'
import socketMiddleware from './socketMiddleware';
import registerChatHandler from './chatHandler';

// const httpServer = createServer(app);\
function initSocket(httpServer:any){
const io = new Server(httpServer,{
    cors:{
    origin:process.env.CLIENT_URL || 'http://0.0.0.0:3000',
    methods:['GET','POST']
  }
})
io.use(socketMiddleware);

io.on('connection',(socket:Socket)=> {
  registerChatHandler(io,socket);
});
return io;
}
export default initSocket;