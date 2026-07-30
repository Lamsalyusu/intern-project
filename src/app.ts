import express from 'express';
import router from './routes/authRoutes';
import taskrouter from './routes/taskRoutes'
import errorHandler from './middlewares/errormiddleware';
const app = express();
app.use(express.json());
import cors from 'cors';
import taskCollaboratorRouter from './routes/taskCollaboratorRoutes';
app.use(cors());


app.use('/api/v1/auth',router);
app.use('/api/v1/tasks',taskrouter)
app.use('/api/v1/tasks',taskCollaboratorRouter)
app.get('/health',(req,res)=>{
    res.status(200).json({status:'ok',message:'app running smoothly'});
});
app.use(errorHandler);
export default app;