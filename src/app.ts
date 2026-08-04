import express from 'express';
import router from './routes/authRoutes';
import taskrouter from './routes/taskRoutes'
import errorHandler from './middlewares/errormiddleware';
import helmet from 'helmet';
const app = express();
const helmes = helmet()
app.use(helmet());
app.use(express.json());
import cors from 'cors';
import taskCollaboratorRouter from './routes/taskCollaboratorRoutes';
import messageRoutes from './routes/messageRoutes';
app.use(cors());


app.use('/api/v1/auth',router);
app.use('/api/v1/tasks',taskrouter)
app.use('/api/v1/tasks',taskCollaboratorRouter)
app.use('/api/v1/tasks',messageRoutes)
app.get('/health',(req,res)=>{
    res.status(200).json({status:'ok',message:'app running smoothly'});
});
app.use(errorHandler);
export default app;