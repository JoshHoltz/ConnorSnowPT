import express from 'express';
import { pool } from './db.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ message: 'Connected!', now: rows[0].now });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

// New route to get membership packages
app.get('/membership-packages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM membership_packages');
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to fetch membership packages' });
  }
});


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});


