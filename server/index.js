import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Fetching Data From Database 

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ message: 'Connected!', now: rows[0].now });
  } catch (err) {
    console.error('Error on /:', err);
    res.status(500).json({ error: 'DB connection failed', details: err.message, stack: err.stack });
  }
});

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
    console.error('Error on /client-testimonals:', err);
    res.status(500).json({ error: 'Failed to fetch welcoming', details: err.message });
  }
});

app.get('/workout-plans', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM workout_plans'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error on /workout-plan:', err);
    res.status(500).json({ error: 'Failed to fetch plans', details: err.message });
  }
});

app.post('/add-user', async (req, res) => {
  const { user_firstname, user_lastname, user_password } = req.body;

  if (!user_firstname || !user_lastname || !user_password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const [result] = await pool.query(
    'INSERT INTO user_logins (user_firstname, user_lastname, user_password) VALUES (?, ?, ?)',
    [user_firstname, user_lastname, user_password]
  );

});

app.listen(process.env.PORT || port, () => {
  console.log(`✅ Server running on port ${process.env.PORT || port}`);
});