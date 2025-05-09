import express from 'express';
import taskRoutes from './routes/taskRoutes';
import './mqtt/client';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(taskRoutes);
export default app;
