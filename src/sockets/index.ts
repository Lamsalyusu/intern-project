import {Server,Socket} from 'socket.io'
import socketMiddleware from './socketMiddleware';

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
  console.log(`user connected, ${socket.id}`);
  socket.on('message',(data)=>{
    console.log(`message received ${data}`)
  });
  socket.on('disconnect',()=>{
    console.log(`User disconnected ${socket.id}`)
  });
});
return io;
}
export default initSocket;