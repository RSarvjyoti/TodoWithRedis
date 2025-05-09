import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

mongoose.connect(mongoURI, {
  dbName: 'assignment'
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true }
});

const Task = mongoose.model('assignment_sarvjyoti', taskSchema);

export const moveTasksToMongo = async (tasks: string[]) => {
  const formatted = tasks.map(task => ({ task }));
  await Task.insertMany(formatted);
};

export const add = async() => {

}

export const fetchAllTasks = async () => {
  return Task.find({});
};