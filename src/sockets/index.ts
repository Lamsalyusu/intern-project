import {Server,Socket,Namespace} from 'socket.io'
import socketMiddleware from './socketMiddleware';
import registerChatHandler from './chatHandler';

function initSocket(httpServer:any){
const io = new Server(httpServer,{
    cors:{
    origin:process.env.CLIENT_URL || 'http://0.0.0.0:3000',
    // methods:['GET','POST']
  }
});
  const chatNamespace: Namespace = io.of('/chat');

  chatNamespace.use(socketMiddleware);
  chatNamespace.on('connection',(socket:Socket)=> {
   console.log(`connected successfully ${socket.id}`);
     registerChatHandler(chatNamespace,socket);
   socket.on('disconnect',()=>{
    console.log(`disconnected client ${socket.id}`)
   });
});
return io;
}
export default initSocket;  