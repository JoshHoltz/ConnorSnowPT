import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- Serve React static files ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..')));

// API Routes

app.get('/membership-packages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM membership_packages');
    res.json(rows);
  } catch (err) {
    console.error('Error on /membership-packages:', err);
    res.status(500).json({ error: 'Failed to fetch membership packages', details: err.message, stack: err.stack });
  }
});

app.get('/client-testimonals', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM client_testimonials WHERE testimonial_rating >= 4 ORDER BY testimonial_id DESC LIMIT 3'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error on /client-testimonals:', err);
    res.status(500).json({ error: 'Failed to fetch testimonials', details: err.message });
  }
});

app.get('/welcome-hero', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM welcome_hero ORDER BY hero_id DESC LIMIT 1'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error on /welcome-hero:', err);
    res.status(500).json({ error: 'Failed to fetch welcoming', details: err.message });
  }
});

app.get('/workout-plans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM workout_plans');
    res.json(rows);
  } catch (err) {
    console.error('Error on /workout-plans:', err);
    res.status(500).json({ error: 'Failed to fetch plans', details: err.message });
  }
});

app.post('/add-user', async (req, res) => {
  const { user_firstname, user_lastname, user_password } = req.body;

  if (!user_firstname || !user_lastname || !user_password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO user_logins (user_firstname, user_lastname, user_password) VALUES (?, ?, ?)',
      [user_firstname, user_lastname, user_password]
    );
    res.status(201).json({ message: 'User added', userId: result.insertId });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user', details: err.message });
  }
});

// *** Catch-all handler: for any request that doesn't match above, serve React's index.html ***

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
