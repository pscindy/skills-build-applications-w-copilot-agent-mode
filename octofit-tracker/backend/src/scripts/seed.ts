import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/resources.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex-rivera',
        email: 'alex.rivera@example.com',
        profile: { displayName: 'Alex Rivera', goal: 'Build endurance' },
      },
      {
        username: 'jamie-chen',
        email: 'jamie.chen@example.com',
        profile: { displayName: 'Jamie Chen', goal: 'Increase strength' },
      },
      {
        username: 'morgan-lee',
        email: 'morgan.lee@example.com',
        profile: { displayName: 'Morgan Lee', goal: 'Stay consistent' },
      },
    ]);

    const teams = await Team.create([
      { name: 'Trailblazers', members: [users[0]._id, users[1]._id] },
      { name: 'Morning Motion', members: [users[2]._id] },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        duration: 32,
        date: new Date('2026-08-18T07:30:00Z'),
        details: { distanceKm: 5.2, intensity: 'moderate' },
      },
      {
        user: users[1]._id,
        type: 'Strength training',
        duration: 45,
        date: new Date('2026-08-19T17:00:00Z'),
        details: { muscleGroups: ['legs', 'core'], intensity: 'high' },
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        duration: 28,
        date: new Date('2026-08-20T06:45:00Z'),
        details: { distanceKm: 9.8, intensity: 'easy' },
      },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 420 },
      { user: users[1]._id, team: teams[0]._id, points: 365 },
      { user: users[2]._id, team: teams[1]._id, points: 290 },
    ]);

    await Workout.create([
      {
        name: 'Core and Cardio Circuit',
        description: 'A balanced circuit for steady conditioning and core stability.',
        difficulty: 'Intermediate',
        exercises: [
          { name: 'Jumping jacks', sets: 3, reps: 30 },
          { name: 'Mountain climbers', sets: 3, reps: 20 },
          { name: 'Plank', sets: 3, durationSeconds: 45 },
        ],
      },
      {
        name: 'Foundations of Strength',
        description: 'A full-body session built around controlled compound movements.',
        difficulty: 'Beginner',
        exercises: [
          { name: 'Bodyweight squats', sets: 3, reps: 12 },
          { name: 'Incline push-ups', sets: 3, reps: 10 },
          { name: 'Reverse lunges', sets: 3, reps: 8 },
        ],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
