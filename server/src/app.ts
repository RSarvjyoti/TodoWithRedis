import express from 'express';
import taskRoutes from './routes/taskRoutes';
import './mqtt/client';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

const app = express();
app.use(cors());

app.use(express.json());
app.use("/", taskRoutes);
export default app;
