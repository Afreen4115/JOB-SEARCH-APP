import express from 'express'; 
import authRoutes  from './routes/auth.js'
import { connectKafka } from './utils/producer.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectKafka();

app.use("/api/auth",authRoutes);

export default app;