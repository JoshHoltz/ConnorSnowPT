import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'dist')));


app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ message: 'Connected!', now: rows[0].now });
  } catch (err) {
    console.error('Error on /:', err);
    res.status(500).json({ error: 'DB connection failed', details: err.message, stack: err.stack });
  }
});

app.get('/api/health'), async (req, res) => {
  res.send('Help me')
};

app.get('/api/membership-packages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM membership_packages');
    res.json(rows);
  } catch (err) {
    console.error('Error on /membership-packages:', err);
    res.status(500).json({ error: 'Failed to fetch membership packages', details: err.message });
  }
});

app.get('/api/client-testimonals', async (req, res) => {
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

app.get('/api/welcome-hero', async (req, res) => {
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

app.get('/api/workout-plans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM workout_plans');
    res.json(rows);
  } catch (err) {
    console.error('Error on /workout-plans:', err);
    res.status(500).json({ error: 'Failed to fetch plans', details: err.message });
  }
});

app.get('/api/client-information', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM client_information');
    res.json(rows);
  } catch (err) {
    console.error('Error on /client-information:', err);
    res.status(500).json({ error: 'Failed to fetch client information', details: err.message });
  }
});

app.get('/api/client-by-id/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM client_information WHERE client_id = ?', [clientId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error on /client-by-id/${clientId}:`, err);
    res.status(500).json({ error: 'Failed to fetch client information', details: err.message });
  }
})

// Inserting frontend to the DB
// REF (Formatting of Insertion): https://stackoverflow.com/questions/56034455/how-to-send-json-data-from-react-to-node-js-express-server
// REF (Status Messages): https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
// REF (Routing Guide): https://expressjs.com/en/guide/routing.html

app.use('/api/insert-user', express.urlencoded()); 

app.post('/api/insert-user', async(req, res) => {
  console.log('Received request to insert user:', req.body);

  const user_firstname = req.body.user_firstname;
  const user_lastname = req.body.user_lastname;
  const user_password = req.body.user_password;

  if (!user_firstname || !user_lastname || !user_password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO user_logins (user_firstname, user_lastname, user_password) VALUES (?, ?, ?)';

  const result = await pool.query(sql, [user_firstname, user_lastname, user_password])
  res.send("Sucessfully inserted User");
});

//inserting a client note
app.use('/api/insert-client-note', express.urlencoded());

app.post('/api/insert-client-note', async (req, res) => {
  console.log('Received request to insert client note:', req.body);

  const client_id = req.body.client_id;
  const client_note = req.body.client_note;

  if (!client_id || !client_note) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log('Inserting to client_id', client_id);
  console.log('Inserting client_note', client_note);

  const sql = 'INSERT INTO client_information (client_id, client_notes) VALUES (?, ?)';

  const result = await pool.query(sql, [client_id, client_note]);
  res.send("Successfully inserted Client Note")
});


app.get('/{*splat}', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
