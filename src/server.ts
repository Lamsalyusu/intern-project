import dotenv from 'dotenv';
dotenv.config();
import  sequelize  from "./config/db";
import app from './app';
import initSocket from './sockets';
import { createServer } from 'node:http';

const httpServer = createServer(app);
initSocket(httpServer);
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
}
connectDB();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
httpServer.listen(Number(PORT),HOST, () => {
 console.log(`Server running on http://${HOST}:${PORT}`);
});
