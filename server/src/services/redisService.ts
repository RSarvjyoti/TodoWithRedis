import { createClient, RedisClientType } from 'redis';
import { moveTasksToMongo } from './mongoService';
import dotenv from 'dotenv';
dotenv.config();

const redisClient: RedisClientType = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

const REDIS_KEY = `FULLSTACK_TASK_Sarvjyoti`;

redisClient.connect().then(() => {
  console.log('Redis connected');
}).catch((err: Error) => {
  console.error('Redis connection error:', err.message);
});

export const addTaskToCache = async (task: string): Promise<void> => {
  const tasksStr = await redisClient.get(REDIS_KEY);
  const taskList: string[] = tasksStr ? JSON.parse(tasksStr) : [];

  taskList.push(task);

  if (taskList.length > 50) {
    await moveTasksToMongo(taskList);
    await redisClient.set(REDIS_KEY, JSON.stringify([]));
  } else {
    await redisClient.set(REDIS_KEY, JSON.stringify(taskList));
  }
};

export const getTasksFromCache = async (): Promise<string[]> => {
  const tasksStr = await redisClient.get(REDIS_KEY);
  return tasksStr ? JSON.parse(tasksStr) : [];
};
