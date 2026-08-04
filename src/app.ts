import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/authRoutes';
import taskrouter from './routes/taskRoutes';
import taskCollaboratorRouter from './routes/taskCollaboratorRoutes';
import messageRoutes from './routes/messageRoutes';
import errorHandler from './middlewares/errormiddleware';

const app = express();

app.use(helmet()); 
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/auth', router);
app.use('/api/v1/tasks', taskrouter);
app.use('/api/v1/tasks', taskCollaboratorRouter);
app.use('/api/v1/tasks', messageRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'app running smoothly' });
});

// Error handling middleware 
app.use(errorHandler);

export default app;
