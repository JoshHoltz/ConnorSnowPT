import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const POSTHOG_PROJECT_ID = 83713;
const POSTHOG_API_KEY = 'phx_X1NQ1gB1ipVUJhvPtBpsoLNjCdroOjwxdv0Sj3JJK6XX29i';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
    const mappedRows = rows.map(plan => {
      plan.plan_image = plan.plan_image?.toString('base64'); // Convert buffer to base64 string
      return plan;
    });

    res.json(mappedRows);
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

// get all upcoming workouts
app.get('/api/upcoming-workouts/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date ASC LIMIT 1', [clientId]);
    res.json(rows);
  } catch (err) {
    console.error(`Error on /upcoming-workouts/${clientId}:`, err);
    res.status(500).json({ error: 'Failed to fetch upcoming workouts', details: err.message });
  }
});

// get all upcoming workouts
app.get('/api/workout-split/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date DESC LIMIT 3', [clientId]);
    res.json(rows);
  } catch (err) {
    console.error(`Error on /workout-split/${clientId}:`, err);
    res.status(500).json({ error: 'Failed to fetch upcoming workouts', details: err.message });
  }
});

// get all upcoming workouts
app.get('/api/motivation-message', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT motivation_message FROM motivation_message WHERE id_motivation_message LIMIT 1');
    res.json(rows);
  } catch (err) {
    console.error('Error on /motivation-message:', err);
    res.status(500).json({ error: 'Failed to fetch motivational message', details: err.message });
  }
});

// Get all exercies from the exercise table
app.get('/api/exercises', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercises');
    res.json(rows);
  } catch (err) {
    console.error('Error on /exercises:', err);
    res.status(500).json({ error: 'Failed to fetch exercises', details: err.message });
  }
});

// Get all body weights from the body_weights table by client_id
app.get('/api/body-weights/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const [rows] = await pool.query('SELECT * FROM body_weights WHERE client_id = ?', [clientId]);
    res.json(rows);
  } catch (err) {
    console.error(`Error on /body-weights/${clientId}:`, err);
    res.status(500).json({ error: 'Failed to fetch body weights', details: err.message });
  }
});

// Get client body weight by client_id limit 1 from bmi_measurements table
app.get('/api/client-bmi/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const [rows] = await pool.query('SELECT * FROM bmi_measurements WHERE client_id = ? ORDER BY submitted_date DESC LIMIT 1', [clientId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error on /client-body-weight/${clientId}:`, err);
    res.status(500).json({ error: 'Failed to fetch client body weight', details: err.message });
  }
});

// Get client muscle mass by client_id limit 1 from muscle_mass_measurements table
app.get('/api/client-muscle-mass/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const [rows] = await pool.query('SELECT * FROM muscle_mass_measurements WHERE client_id = ? ORDER BY submitted_date DESC LIMIT 1', [clientId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error on /client-muscle-mass/${clientId}:`, err);
    res.status(500).json({ error: 'Failed to fetch client muscle mass', details: err.message });
  }
});

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

  const client_id = Number(req.body.client_id);
  const client_note = String(req.body.client_note);

  if (!client_id || !client_note) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log('Inserting to client_id', client_id);
  console.log('Inserting client_note', client_note);

  const sql = 'UPDATE client_information SET client_notes = ? WHERE client_id = ?';
  await pool.query(sql, [client_note, client_id]);
  res.json({ message: "Successfully inserted Client Note" });
});

//inserting a package change 
app.use('/api/insert-package-change', express.urlencoded());

app.post('/api/insert-package-change', async (req, res) => {
  console.log('Received request to insert package change:', req.body);

    const packageId = Number(req.body.package_id);
    const packageName = String(req.body.package_name);
    const packagePrice = String(req.body.package_price);
    const packageDescription = String(req.body.package_description);
    const featuresArray = req.body['package_features[]']; // get the array in the same way as the other names 
    const excludesArray = req.body['package_excludes[]']; // for both included and excluded features

    const packageFeatures = Array.isArray(featuresArray) ? featuresArray.join(',') : featuresArray || ''; // join the array into one string seperated by commas (as in the db)
    const packageExcludes = Array.isArray(excludesArray) ? excludesArray.join(',') : excludesArray || '';

  if (!packageId || !packageName || !packagePrice || !packageDescription) {
    return res.status(400).json({ error: 'All fields are required' });
  }

    const sql = " UPDATE membership_packages SET package_name = ?, package_price = ?, package_description = ?, package_features = ?, package_excludes = ? WHERE package_id = ?";

    await pool.query(sql, [ packageName, packagePrice, packageDescription, packageFeatures, packageExcludes, packageId, ]);  
    res.json({ message: "Successfully inserted package change" });
});

//inserting a plan change 
app.use('/api/insert-plan-change', express.urlencoded());

app.post('/api/insert-plan-change', async (req, res) => {
  console.log('Received request to insert plan change:', req.body);

    const plan_id = Number(req.body.plan_id);
    const plan_name = String(req.body.plan_name);
    const plan_description = String(req.body.plan_description);
    const plan_pages = Number(req.body.plan_pages);
    const plan_price = String(req.body.plan_price);

  if (!plan_id || !plan_name || !plan_description || !plan_pages || !plan_price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

    const sql = " UPDATE workout_plans SET plan_name = ?, plan_description = ?, plan_pages = ?, plan_price = ? WHERE plan_id = ?";

    await pool.query(sql, [ plan_name, plan_description, plan_pages, plan_price, plan_id ]);  
    res.json({ message: "Successfully inserted plan change" });
});

//api insert a client pr 
app.use('/api/insert-client-bench-pr', express.urlencoded());

app.post('/api/insert-client-pr-result-1', async (req, res) => {
  console.log('Received request to insert client PR:', req.body);

  const client_id = Number(req.body.client_id);
  const client_pr_result_1 = Number(req.body.client_pr_result_1);

  if (!client_id || !client_pr_result_1) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log('Inserting to client_id', client_id);
  console.log('Inserting client_pr_result_1', client_pr_result_1);

  const sql = 'UPDATE client_information SET client_pr_result_1 = ? WHERE client_id = ?';
  await pool.query(sql, [client_pr_result_1, client_id]);
  res.json({ message: "Successfully inserted Client PR" });
}
);

//inserting a client change split
app.post("/api/insert-a-client-split", async (req, res) => {
  try {
    const clientId = req.body.client_id;

    if (!clientId) {
      return res.status(400).json({ error: "Missing client_id" });
    }

    const workout = {
      upcoming_workout_split_name: req.body.upcoming_workout_split_name || "",
      upcoming_workout_date: req.body.upcoming_workout_date || "",
      idupcoming_workouts: req.body.idupcoming_workouts || null,
    };

    const exercises = req.body.exercises || [];

    const mapIndexToSuffix = ["one", "two", "three", "four", "five", "six"];

    for (let i = 0; i < 6; i++) {
      const ex = exercises[i] || {};
      const suffix = mapIndexToSuffix[i];
      workout[`upcoming_workout_e_${suffix}_name`] = ex.name || "";
      workout[`upcoming_workout_e_${suffix}_sets`] = ex.sets || "";
      workout[`upcoming_workout_e_${suffix}_reps`] = ex.reps || "";
      workout[`upcoming_workout_e_${suffix}_how_to`] = ex.howTo || "";
    }

    console.log("Request body:", req.body);
console.log("Workout object:", workout);

    if (workout.idupcoming_workouts) {
      // Update existing workout
      await pool.query(
        `UPDATE upcoming_workouts SET
          upcoming_workout_split_name = ?,
          upcoming_workout_date = ?,
          upcoming_workout_e_one_name = ?,
          upcoming_workout_e_one_sets = ?,
          upcoming_workout_e_one_reps = ?,
          upcoming_workout_e_one_how_to = ?,
          upcoming_workout_e_two_name = ?,
          upcoming_workout_e_two_sets = ?,
          upcoming_workout_e_two_reps = ?,
          upcoming_workout_e_two_how_to = ?,
          upcoming_workout_e_three_name = ?,
          upcoming_workout_e_three_sets = ?,
          upcoming_workout_e_three_reps = ?,
          upcoming_workout_e_three_how_to = ?,
          upcoming_workout_e_four_name = ?,
          upcoming_workout_e_four_sets = ?,
          upcoming_workout_e_four_reps = ?,
          upcoming_workout_e_four_how_to = ?,
          upcoming_workout_e_five_name = ?,
          upcoming_workout_e_five_sets = ?,
          upcoming_workout_e_five_reps = ?,
          upcoming_workout_e_five_how_to = ?,
          upcoming_workout_e_six_name = ?,
          upcoming_workout_e_six_sets = ?,
          upcoming_workout_e_six_reps = ?,
          upcoming_workout_e_six_how_to = ?
        WHERE idupcoming_workouts = ?`,
        [
          workout.upcoming_workout_split_name,
          workout.upcoming_workout_date,
          workout.upcoming_workout_e_one_name,
          workout.upcoming_workout_e_one_sets,
          workout.upcoming_workout_e_one_reps,
          workout.upcoming_workout_e_one_how_to,
          workout.upcoming_workout_e_two_name,
          workout.upcoming_workout_e_two_sets,
          workout.upcoming_workout_e_two_reps,
          workout.upcoming_workout_e_two_how_to,
          workout.upcoming_workout_e_three_name,
          workout.upcoming_workout_e_three_sets,
          workout.upcoming_workout_e_three_reps,
          workout.upcoming_workout_e_three_how_to,
          workout.upcoming_workout_e_four_name,
          workout.upcoming_workout_e_four_sets,
          workout.upcoming_workout_e_four_reps,
          workout.upcoming_workout_e_four_how_to,
          workout.upcoming_workout_e_five_name,
          workout.upcoming_workout_e_five_sets,
          workout.upcoming_workout_e_five_reps,
          workout.upcoming_workout_e_five_how_to,
          workout.upcoming_workout_e_six_name,
          workout.upcoming_workout_e_six_sets,
          workout.upcoming_workout_e_six_reps,
          workout.upcoming_workout_e_six_how_to,
          workout.idupcoming_workouts,
        ]
      );
    } else {
      // Insert new workout
      await pool.query(
        `INSERT INTO upcoming_workouts (
          client_id,
          upcoming_workout_split_name,
          upcoming_workout_date,
          upcoming_workout_e_one_name,
          upcoming_workout_e_one_sets,
          upcoming_workout_e_one_reps,
          upcoming_workout_e_one_how_to,
          upcoming_workout_e_two_name,
          upcoming_workout_e_two_sets,
          upcoming_workout_e_two_reps,
          upcoming_workout_e_two_how_to,
          upcoming_workout_e_three_name,
          upcoming_workout_e_three_sets,
          upcoming_workout_e_three_reps,
          upcoming_workout_e_three_how_to,
          upcoming_workout_e_four_name,
          upcoming_workout_e_four_sets,
          upcoming_workout_e_four_reps,
          upcoming_workout_e_four_how_to,
          upcoming_workout_e_five_name,
          upcoming_workout_e_five_sets,
          upcoming_workout_e_five_reps,
          upcoming_workout_e_five_how_to,
          upcoming_workout_e_six_name,
          upcoming_workout_e_six_sets,
          upcoming_workout_e_six_reps,
          upcoming_workout_e_six_how_to
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          clientId,
          workout.upcoming_workout_split_name,
          workout.upcoming_workout_date,
          workout.upcoming_workout_e_one_name,
          workout.upcoming_workout_e_one_sets,
          workout.upcoming_workout_e_one_reps,
          workout.upcoming_workout_e_one_how_to,
          workout.upcoming_workout_e_two_name,
          workout.upcoming_workout_e_two_sets,
          workout.upcoming_workout_e_two_reps,
          workout.upcoming_workout_e_two_how_to,
          workout.upcoming_workout_e_three_name,
          workout.upcoming_workout_e_three_sets,
          workout.upcoming_workout_e_three_reps,
          workout.upcoming_workout_e_three_how_to,
          workout.upcoming_workout_e_four_name,
          workout.upcoming_workout_e_four_sets,
          workout.upcoming_workout_e_four_reps,
          workout.upcoming_workout_e_four_how_to,
          workout.upcoming_workout_e_five_name,
          workout.upcoming_workout_e_five_sets,
          workout.upcoming_workout_e_five_reps,
          workout.upcoming_workout_e_five_how_to,
          workout.upcoming_workout_e_six_name,
          workout.upcoming_workout_e_six_sets,
          workout.upcoming_workout_e_six_reps,
          workout.upcoming_workout_e_six_how_to,
        ]
      );
    }
    res.json({ success: true });

  } catch (err) {
  console.error("Workout save error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
    stack: err.stack,
  });
}
});

// insert a client body weight
app.use('/api/insert-client-body-weight', express.urlencoded());
app.post('/api/insert-client-body-weight', async (req, res) => {
  console.log('Received request to insert client body weight:', req.body);

  const client_id = Number(req.body.client_id);
  const body_weight = Number(req.body.body_weight); 
  const submitted_date = req.body.submitted_date || new Date().toISOString().split("T")[0];

  if (!client_id || !body_weight) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log('Inserting to client_id', client_id);
  console.log('Inserting body_weight', body_weight);

  const sql = 'INSERT INTO body_weights (client_id, body_weight, submitted_date) VALUES (?, ?, ?)';
  await pool.query(sql, [client_id, body_weight, submitted_date]);

  res.json({ message: "Successfully inserted Client Body Weight" });
});
// Logging In

app.use('/api/login-user', express.urlencoded());

app.post('/api/login-user', async (req, res) => {
  try {
    const { user_username, user_password } = req.body;

    if (!user_username || !user_password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `
      SELECT user_id, user_username, isAdmin
      FROM user_logins
      WHERE user_username = ? AND user_password = ?
      LIMIT 1
    `;
    const [rows] = await pool.query(sql, [user_username, user_password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];

    return res.json({
      success: true,
      user_id: user.user_id,
      user_username: user.user_username,
      isAdmin: user.isAdmin, 
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PostHog API Fetch 
// Fetching the traffic that interact with the "Start Your Journey" CTA
app.get("/api/posthog-homepage-cta-clicks", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${POSTHOG_API_KEY}`
  };

  const payload = {
    query: {
      kind: "HogQLQuery",
      query: "SELECT count() AS click_count FROM events WHERE matchesAction('Clicked \"Start Your Journey\"')"
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Total Web Connections for 1 Week Display

app.get("/api/posthog-web-connections", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${POSTHOG_API_KEY}`
  };

  const payload = {
    query: {
      kind: "HogQLQuery",
      query: `SELECT 
              toDate(timestamp) AS date,
              count() AS pageviews
              FROM events
          WHERE 
            event = '$pageview'
            AND timestamp >= now() - INTERVAL 7 DAY
          GROUP BY date
          ORDER BY date ASC`,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/{*splat}', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

