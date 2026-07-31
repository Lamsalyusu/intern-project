import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import {createServer} from 'http';
import {Server,Socket} from 'socket.io'
import  sequelize  from "./config/db";
import app from './app';
import socketMiddleware from './sockets/socketMiddleware';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin:process.env.CLIENT_URL || 'http://0.0.0.0:3000',
    methods:['GET','POST']
  }
});
io.use(socketMiddleware);
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
}
connectDB();

io.on('connection',(socket:Socket)=> {
  console.log(`user connected, ${socket.id}`);

  socket.on('message',(data)=>{
    console.log(`message received ${data}`)
  });

  socket.on('disconnect',()=>{
    console.log(`User disconnected ${socket.id}`)
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
httpServer.listen(Number(PORT),HOST, () => {
 console.log(`Server running on http://${HOST}:${PORT}`);
});
