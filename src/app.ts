import express from 'express';
import router from './routes/authRoutes';
const app = express();
app.use(express.json());
import cors from 'cors';
app.use(cors());


app.use('/api/v1/auth',router);
app.get('/health',(req,res)=>{
    res.status(200).json({status:'ok',message:'app running smoothly'});
});
export default app;