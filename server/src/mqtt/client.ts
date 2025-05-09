import mqtt from 'mqtt';
import { addTaskToCache } from '../services/redisService';
import dotenv from 'dotenv';
dotenv.config();

const client = mqtt.connect(process.env.MQTT_URL!);

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe('/add');
});

client.on('message', async (topic, message) => {
  if (topic === '/add') {
    const task = message.toString();
    await addTaskToCache(task);
  }
});

export default client;