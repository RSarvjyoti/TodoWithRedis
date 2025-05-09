import express from 'express';
import { getTasksFromCache } from '../services/redisService';
import { fetchAllTasks } from '../services/mongoService';

const router = express.Router();

router.get('/fetchAllTasks', async (req, res) => {
  const cacheTasks = await getTasksFromCache();
  const dbTasks = await fetchAllTasks();
  res.json([...cacheTasks, ...dbTasks.map(t => t.task)]);
});

export default router;