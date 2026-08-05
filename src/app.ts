import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/authRoutes';
import taskrouter from './routes/taskRoutes';
import taskCollaboratorRouter from './routes/taskCollaboratorRoutes';
import messageRoutes from './routes/messageRoutes';
import errorHandler from './middlewares/errormiddleware';

const app = express();

// allowedOrigins = ['http://localhost:3000','https://myinternaltool.com'];
// const corsOptions: cors.CorsOptions = {
    // 1. Only allow specific frontend domains
    //      origin: (origin, callback) => {
    //     // !origin allows server-to-server or tools like Postman to work
    //     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //     } else {
    //     callback(new Error('Blocked by CORS policy'));
    //     }
    // },
//     //this allows frontend to send cookies or authorization headers
//     credentials:true,
//     //limit the methods to the requirements only
//     methods:['GET','PUT','POST','DELETE'],
//     //Headers the client is allowed to send
//     allowedHeaders:['Content-Type','Authorization','X-Device-ID'],
//     //headers the client browser is allowed to read from the server response
//     exposedHeaders:['RateLImit-Limit','RateLimit-Reamining','RateLimit-Reset']
    
// }

// app.use(cors(corsOptions))

// Configure custom Helmet security policies
// app.use(
//   helmet({
    // 1. Content Security Policy configuration
    // contentSecurityPolicy: {
    //   directives: {
    //     defaultSrc: ["'self'"], // By default, only trust data from your own domain
    //     scriptSrc: ["'self'", "'trusted-cdn.com'"], // Allowed script locations
    //     styleSrc: ["'self'", "'://googleapis.com'", "'unsafe-inline'"], // Allowed CSS styling locations
    //     fontSrc: ["'self'", "'://gstatic.com'"], // Allowed font origins
    //     imgSrc: ["'self'", "data:", "https://unsplash.com"], // Allowed image asset origins
    //     objectSrc: ["'none'"], // Blocks vulnerable flash/plugins
    //     upgradeInsecureRequests: [], // Automatically forces HTTP links to upgrade to HTTPS
    //   },
    // },

    // 2. Cross-Origin configurations (Adjust if external images/scripts break)
    // crossOriginEmbedderPolicy: false, 
    // crossOriginOpenerPolicy: { policy: "same-origin" },

    // 3. Prevent Clickjacking
    // xFrameOptions: { action: "deny" },

    // 4. Force HTTPS (Lasts for 1 year)
    // strictTransportSecurity: {
    //   maxAge: 31536000,
    //   includeSubDomains: true,
    //   preload: true,
    // },

    // 5. Explicitly block browsers from sniffing content types away from what the server declares
    // xContentTypeOptions: true,
//   })
// );

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
