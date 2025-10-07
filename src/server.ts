import express from 'express';
import { rootRoute } from './routes/rootRoute';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors'
import { morganMiddleware } from './utils/logger';
import rateLimit from 'express-rate-limit';
import { config } from './config/envConfig';
import slowDown from 'express-slow-down';

const app = express()

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: config.CLIENT_URL,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message:"we has received too many request, please try after 30 minutes"
});
app.use('/api',limiter);

const throttle  = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100, 
  delayMs: () => 500 
});

app.use('/api',throttle)
app.use(morganMiddleware);



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/', rootRoute)









app.use(errorHandler)
app.listen(config.PORT, ()=>{
    console.log('connected to port: ',config.PORT )
})