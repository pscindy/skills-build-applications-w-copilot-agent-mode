import express from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/resources.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

function registerResourceRoutes(
  path: string,
  model: mongoose.Model<any>,
  options: { sort?: Record<string, 1 | -1> } = {},
) {
  app.get(`/api/${path}/`, async (_request, response) => {
    try {
      const records = await model.find().sort(options.sort ?? { createdAt: -1 });
      response.json(records);
    } catch (error) {
      console.error(`Failed to load ${path}:`, error);
      response.status(500).json({ error: `Unable to load ${path}` });
    }
  });

  app.post(`/api/${path}/`, async (request, response) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      console.error(`Failed to create ${path} record:`, error);
      response.status(400).json({ error: 'Invalid request data' });
    }
  });
}

registerResourceRoutes('users', User);
registerResourceRoutes('teams', Team);
registerResourceRoutes('activities', Activity);
registerResourceRoutes('leaderboard', Leaderboard, { sort: { points: -1 } });
registerResourceRoutes('workouts', Workout);

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});
