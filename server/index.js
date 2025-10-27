import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./db.js";

import PDFDocument from 'pdfkit';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


import bcrypt from "bcrypt";
import { data } from "react-router-dom";

const trainerName = "Connor Snow";

const POSTHOG_PROJECT_ID = 83713;
const POSTHOG_API_KEY = "phx_X1NQ1gB1ipVUJhvPtBpsoLNjCdroOjwxdv0Sj3JJK6XX29i";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.json({ message: "Connected!", now: rows[0].now });
  } catch (err) {
    console.error("Error on /:", err);
    res
      .status(500)
      .json({
        error: "DB connection failed",
        details: err.message,
        stack: err.stack,
      });
  }
});

(app.get("/api/health"),
  async (req, res) => {
    res.send("Help me");
  });

app.get("/api/membership-packages", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM membership_packages");
    res.json(rows);
  } catch (err) {
    console.error("Error on /membership-packages:", err);
    res
      .status(500)
      .json({
        error: "Failed to fetch membership packages",
        details: err.message,
      });
  }
});

app.get("/api/client-testimonals", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM client_testimonials WHERE testimonial_rating >= 4 ORDER BY testimonial_id DESC LIMIT 3",
    );
    res.json(rows);
  } catch (err) {
    console.error("Error on /client-testimonals:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch testimonials", details: err.message });
  }
});

app.get("/api/welcome-hero", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM welcome_hero ORDER BY hero_id DESC LIMIT 1",
    );
    res.json(rows);
  } catch (err) {
    console.error("Error on /welcome-hero:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch welcoming", details: err.message });
  }
});

app.get("/api/workout-plans", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM workout_plans");
    const mappedRows = rows.map((plan) => {
      plan.plan_image = plan.plan_image?.toString("base64"); // Convert buffer to base64 string
      return plan;
    });

    res.json(mappedRows);
  } catch (err) {
    console.error("Error on /workout-plans:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch plans", details: err.message });
  }
});

app.get("/api/client-information", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM client_information");
    res.json(rows);
  } catch (err) {
    console.error("Error on /client-information:", err);
    res
      .status(500)
      .json({
        error: "Failed to fetch client information",
        details: err.message,
      });
  }
});

app.get("/api/client-by-id/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM client_information WHERE client_id = ?",
      [clientId],
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error on /client-by-id/${clientId}:`, err);
    res
      .status(500)
      .json({
        error: "Failed to fetch client information",
        details: err.message,
      });
  }
});

// get all upcoming workouts
app.get("/api/upcoming-workouts/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date ASC LIMIT 1",
      [clientId],
    );
    res.json(rows);
  } catch (err) {
    console.error(`Error on /upcoming-workouts/${clientId}:`, err);
    res
      .status(500)
      .json({
        error: "Failed to fetch upcoming workouts",
        details: err.message,
      });
  }
});

// upcoming workout AI analysis
app.get("/api/upcoming-workouts/:id/analysis", async (req, res) => {
  const clientId = req.params.id;
  const trainerName = "Connor Snow";
  
  try {
    const [rows] = await pool.query(
      "SELECT * FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date ASC LIMIT 1",
      [clientId],
    );

    const prompt = `
You are a personal trainer called ${trainerName}, and you are analysing an upcoming workout for your client. 
Analyse the workout routine and provide tips or an alternative exercise if you think it may be too hard for a particular exercise. 
Keep it brief - 2-3 sentences.
Here is the client's upcoming workout data: ${JSON.stringify(rows)}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and motivational personal trainer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const aiMessage = response.choices[0].message.content;

    res.json({ aiAnalysis: aiMessage }); 
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    res.status(500).json({ error: "Failed to generate AI analysis" });
  }
});

// get all upcoming workouts
app.get("/api/workout-split/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query(
      "SELECT idupcoming_workouts, upcoming_workout_split_name, upcoming_workout_date, exercises_json FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date DESC LIMIT 3",
      [clientId]
    );
    
    const workouts = rows.map((row) => {
      let exercises = [];
      
      if (row.exercises_json) {
        if (typeof row.exercises_json === 'string') {
          exercises = JSON.parse(row.exercises_json);
        } else if (typeof row.exercises_json === 'object') {
          exercises = row.exercises_json;
        }
      }
      
      return {
        idupcoming_workouts: row.idupcoming_workouts,
        upcoming_workout_split_name: row.upcoming_workout_split_name,
        upcoming_workout_date: row.upcoming_workout_date,
        exercises: exercises,
      };
    });
    
    res.json(workouts);
  } catch (err) {
    console.error(`Error on /workout-split/${clientId}:`, err);
    res.status(500).json({
      error: "Failed to fetch upcoming workouts",
      details: err.message,
    });
  }
});

//Get a pdf download link for workouts
//Get a pdf download link for workouts
// pdfkit docs REF: https://pdfkit.org/docs/getting_started.html
// pdf kit setHeader REF: https://stackoverflow.com/questions/60488444/creating-pdf-with-pdfkit-no-save-options
// pdf text styles REF: https://pdfkit.org/docs/text.html
app.get("/api/workout-split/:id/pdf", async (req, res) => {
  const clientId = req.params.id;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date DESC LIMIT 3",
      [clientId],
    );

    const doc = new PDFDocument();

    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="workout-split.pdf"');

    doc.pipe(res);

    doc.font(20).text('Workout Split', { align: 'center' });
    doc.moveDown();

    rows.forEach(workout => {
      doc.fontSize(12).text(`Date: ${workout.upcoming_workout_date}`);
      doc.text(`Exercise: ${workout.exercise_name}`);
      doc.moveDown(0.5);
    });

    doc.on('end', () => { //trying to fix hangtime errors
      res.end();
    });

    doc.end();
  } catch (err) {
    console.error(`Error on /workout-split/${clientId}/pdf:`, err);
    res.status(500).json({
      error: "Failed to generate PDF",
      details: err.message,
    });
  }
});


// get all upcoming workouts
app.get("/api/motivation-message", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT motivation_message FROM motivation_message WHERE id_motivation_message LIMIT 1",
    );
    res.json(rows);
  } catch (err) {
    console.error("Error on /motivation-message:", err);
    res
      .status(500)
      .json({
        error: "Failed to fetch motivational message",
        details: err.message,
      });
  }
});

// Get all exercies from the exercise table
app.get("/api/exercises", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM exercises");
    res.json(rows);
  } catch (err) {
    console.error("Error on /exercises:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch exercises", details: err.message });
  }
});

// Get all body weights from the body_weights table by client_id
// openAI Analysis (REF: https://platform.openai.com/docs/quickstart)
app.get("/api/body-weights/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  const trainerName = "Connor Snow"; 
  try {
    const [rows] = await pool.query(
      "SELECT * FROM body_weights WHERE client_id = ? ORDER BY submitted_date ASC",
      [clientId],
    );

    const prompt = `
  You are a personal trainer called ${trainerName}, and you are analysing a client's body weight over time metric. 
  Write a short 2-3 sentence analysis of the client's body weight and progress to keep them motivated.
  Mention if they are making good progress, or if they have slowed down a bit. 
  If they have gained or slowed down encourage them, or ask them to talk to the trainer. 
  Provide clear and professional advice. 
  Here is the client's body weight data: ${JSON.stringify(rows)}
  `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and motivational personal trainer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const aiMessage = response.choices[0].message.content;

    res.json({ bodyWeights: rows, analysis: aiMessage });
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    res.status(500).json({ error: "Failed to generate AI analysis" });
  }
});

// Get client body weight by client_id limit 1 from bmi_measurements table
app.get("/api/client-bmi/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM bmi_measurements WHERE client_id = ? ORDER BY submitted_date DESC LIMIT 1",
      [clientId],
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error on /client-body-weight/${clientId}:`, err);
    res
      .status(500)
      .json({
        error: "Failed to fetch client body weight",
        details: err.message,
      });
  }
});

// Get client muscle mass by client_id limit 1 from muscle_mass_measurements table
app.get("/api/client-muscle-mass/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM muscle_mass_measurements WHERE client_id = ? ORDER BY submitted_date DESC LIMIT 1",
      [clientId],
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error on /client-muscle-mass/${clientId}:`, err);
    res
      .status(500)
      .json({
        error: "Failed to fetch client muscle mass",
        details: err.message,
      });
  }
});

// Detailed AI Analysis and review of all metrics
app.get("/api/detailed-client-tracking/:id/analysis", async (req, res) => {
  const clientId = req.params.id;
  const trainerName = "Connor Snow";
  
  try {

        const [upcomingWorkout] = await pool.query(
      "SELECT * FROM upcoming_workouts WHERE client_id = ? ORDER BY upcoming_workout_date ASC LIMIT 1",
      [clientId]
    );

        const [bodyWeights] = await pool.query(
      "SELECT * FROM body_weights WHERE client_id = ? ORDER BY submitted_date ASC",
      [clientId]
    );

        const [bmiMeasurements] = await pool.query(
      "SELECT * FROM bmi_measurements WHERE client_id = ? ORDER BY submitted_date DESC",
      [clientId]
    );

        const [muscleMass] = await pool.query(
      "SELECT * FROM muscle_mass_measurements WHERE client_id = ? ORDER BY submitted_date DESC",
      [clientId]
    );

        const clientData = {
      upcomingWorkout: upcomingWorkout[0] || null,
      bodyWeights,
      bmiMeasurements,
      muscleMass
    };

    const prompt = `
You are a personal trainer called ${trainerName}, and you are analysing an the overall general information and statistics and trends of a client. 
Analyse the follwoing:

- workout routine, 
- the body weight trend over time, 
- bmi measurements
- muscle mass measurements, 

Analyse and explain:
- what is going well
- areas of improvement
- overall progress
- reccommendations

Explain that further help and specific direction can be provided by ${trainerName}

You are talking directly to the client not the trainer. Say things like Hello, and youre 

When displaying the data, remember to include paragrahs and spaces making it easier to read.

Client Data: ${JSON.stringify(clientData)}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and motivational personal trainer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    const aiMessage = response.choices[0].message.content;

    res.json({ 
      aiAnalysis: aiMessage,
      data: clientData
    }); 
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    res.status(500).json({ error: "Failed to generate AI analysis" });
  }
});

app.get("/api/pr-analysis/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  const trainerName = "Connor Snow";

  try {
    const [clientData] = await pool.query(
      "SELECT client_pr_name_1, client_pr_result_1, client_pr_name_2, client_pr_result_2, client_pr_name_3, client_pr_result_3, client_pr_name_4, client_pr_result_4 FROM client_information WHERE client_id = ?",
      [clientId],
    );

    if (!clientData || clientData.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    const prData = clientData[0];

    const prResults = [
      { name: prData.client_pr_name_1, result: prData.client_pr_result_1 },
      { name: prData.client_pr_name_2, result: prData.client_pr_result_2 },
      { name: prData.client_pr_name_3, result: prData.client_pr_result_3 },
      { name: prData.client_pr_name_4, result: prData.client_pr_result_4 },
    ].filter((pr) => pr.name && pr.result);

    if (prResults.length === 0) {
      return res.status(400).json({ error: "No PR data available for analysis" });
    }

    const prompt = `
You are a personal trainer called ${trainerName}, and you are analysing a client's personal records (PRs) for various exercises.
Write a short 2-3 sentence analysis of the client's strength performance.
Highlight their top achievements and progress. Be encouraging.
Provide clear and professional advice on how they can continue to improve.
PRs are in kg
Here are the client's PR data: ${JSON.stringify(prResults)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and motivational personal trainer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const aiMessage = response.choices[0].message.content;

    res.json({ prData: prResults, analysis: aiMessage });
  } catch (error) {
    console.error("Error generating AI PR analysis:", error);
    res.status(500).json({ error: "Failed to generate AI analysis" });
  }
});

// Get PR analysis for all clients
app.get("/api/pr-analysis-all", async (req, res) => {
  const trainerName = "Connor Snow";

  try {
    const [allClientsData] = await pool.query(
      "SELECT client_id, client_name, client_pr_name_1, client_pr_result_1, client_pr_name_2, client_pr_result_2, client_pr_name_3, client_pr_result_3, client_pr_name_4, client_pr_result_4 FROM client_information"
    );

    if (!allClientsData || allClientsData.length === 0) {
      return res.status(404).json({ error: "No clients found" });
    }

    const clientAnalyses = [];

    for (const client of allClientsData) {
      const prResults = [
        { name: client.client_pr_name_1, result: client.client_pr_result_1 },
        { name: client.client_pr_name_2, result: client.client_pr_result_2 },
        { name: client.client_pr_name_3, result: client.client_pr_result_3 },
        { name: client.client_pr_name_4, result: client.client_pr_result_4 },
      ].filter((pr) => pr.name && pr.result);

      if (prResults.length === 0) continue;

      const prompt = `
You are a personal trainer called ${trainerName}, and you are analysing a client's personal records (PRs) for various exercises.
Write a short 2-3 sentence analysis of the client's strength performance.
Highlight their top achievements and progress. Be encouraging.
Provide clear and professional advice on how they can continue to improve.
PRs are in kg
Here are the client's PR data: ${JSON.stringify(prResults)}
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful and motivational personal trainer." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
      });

      const aiMessage = response.choices[0].message.content;

      clientAnalyses.push({
        clientId: client.client_id,
        clientName: client.client_name,
        prData: prResults,
        analysis: aiMessage,
      });
    }

    res.json({ clients: clientAnalyses });
  } catch (error) {
    console.error("Error generating AI PR analysis:", error);
    res.status(500).json({ error: "Failed to generate AI analysis" });
  }
});

// To Do Get
app.get("/api/trainer-todo", async (req, res) => {

  try {
    const [rows] = await pool.query(
      "SELECT * FROM trainer_todo ORDER BY todo_date DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(`Error on /trainer-todo:`, err);
    res.status(500).json({
      error: "Failed to fetch trainer todo items",
      details: err.message,
    });
  }
  
});


// Count(*) for total clients
app.get("/api/client-count", async (req, res) => {

  try {
    const count = await pool.query("SELECT COUNT(*) FROM client_information");
    res.json(count[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to get count",
      error,
    });
  }
  
});

// Retriving Stripe Balance
// getting stripe charges: REF: https://docs.stripe.com/api/charges/list
// limit and list REF: https://stackoverflow.com/questions/46068866/how-to-get-the-total-revenue-of-my-account-in-stripe-node-js
app.get("/api/stripe-total-sales", async (req, res) => {
  try {
    const sales = await stripe.charges.list({
      limit: 100
    });

    let totalSales = 0;
    sales.data.forEach(charge => {
      if (charge.paid) {
        totalSales += charge.amount;
      }
    });

    totalSales = totalSales / 100;
    console.log(`Total Sales: $${totalSales.toFixed(2)}`);
    res.json({ totalSales: totalSales.toFixed(2) });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: error.message });
  }
});

//Monthly Overview
// getting month REF: https://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
// stripe fetching with date arg: REF: https://stackoverflow.com/questions/14931264/how-to-get-charges-transactions-details-in-stripe-based-on-date-range
app.get("/api/stripe-monthly-sales", async (req, res) => {
  try {

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthStartStripeConversion = Math.floor(firstDay.getTime() / 1000); //seconds for stripe

    const sales = await stripe.charges.list({
      limit: 100,
      created: {gte: monthStartStripeConversion}
    });

    let totalSales = 0;
    sales.data.forEach(charge => {
      if (charge.paid) {
        totalSales += charge.amount;
      }
    });

    totalSales = totalSales / 100;
    console.log(`Total Monthly Sales: $${totalSales.toFixed(2)}`);
    res.json({ totalSales: totalSales.toFixed(2) });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: error.message });
  }
});

// past 6 months of data
// get 6 months past REF: https://stackoverflow.com/questions/1648392/get-a-date-object-six-months-prior-from-another-date-object
app.get("/api/stripe-six-monthly-sales", async (req, res) => {
  try {
    const now = new Date();
    const monthlySales = [];

    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonthDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const monthStartStripeConversion = Math.floor(monthDate.getTime() / 1000);
      const monthEndStripeConversion = Math.floor(nextMonthDate.getTime() / 1000);

      const sales = await stripe.charges.list({
        limit: 100,
        created: { gte: monthStartStripeConversion, lt: monthEndStripeConversion }
      });

      let totalSales = 0;
      sales.data.forEach(charge => {
        if (charge.paid) {
          totalSales += charge.amount;
        }
      });

      totalSales = totalSales / 100;
      const monthName = monthDate.toLocaleString('default', { month: 'short' }); //month short REF: https://stackoverflow.com/questions/76422584/js-tolocalestring-shows-numeric-value-for-short-month-instead-of-month
      
      monthlySales.push({
        month: monthName,
        sales: totalSales.toFixed(2)
      });
    }

    console.log(monthlySales);
    res.json({ monthlySales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: error.message });
  }
});

// Inserting frontend to the DB
// REF (Formatting of Insertion): https://stackoverflow.com/questions/56034455/how-to-send-json-data-from-react-to-node-js-express-server
// REF (Status Messages): https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
// REF (Routing Guide): https://expressjs.com/en/guide/routing.html

// inseert admin to do
app.use('/api/insert-todo', express.urlencoded());

app.post('/api/insert-todo', async (req, res) => {
  console.log('Request to insert admin todo', req.body);

  const todo = req.body.todo;

  if (!todo) {
    return res.status(400).json({error: 'All fields required'})
  }

  const sql =
    "INSERT INTO trainer_todo (todo_item, todo_date) VALUES (?, NOW())";

  const result = await pool.query(sql, [todo]);
  res.send('Successfully inserted')

})

app.use("/api/insert-user", express.urlencoded());

app.post("/api/insert-user", async (req, res) => {
  console.log("Received request to insert user:", req.body);

  const user_firstname = req.body.user_firstname;
  const user_lastname = req.body.user_lastname;
  const user_password = req.body.user_password;

  if (!user_firstname || !user_lastname || !user_password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO user_logins (user_firstname, user_lastname, user_password) VALUES (?, ?, ?)";

  const result = await pool.query(sql, [
    user_firstname,
    user_lastname,
    user_password,
  ]);
  res.send("Sucessfully inserted User");
});

// insert hypothesis client form
app.use("/api/insert-client-hypothesis", express.urlencoded());

app.post("/api/insert-client-hypothesis", async (req, res) => {
  console.log('request to insert client hypothesis to db', req.body);

  // client fitness progression
  const fitnessImproved = req.body.fitnessImproved
  const fitnessDetails = req.body.fitnessDetails
  const fitnessScale = req.body.fitnessScale

  // client usabilty 
  const usabilityScore = req.body.usabilityScore
  const progressTracking = req.body.progressTracking
  const fitnessProgressText = req.body.fitnessProgressText

  // Motivation & Encouragement Hypothesis
  const progressAnalyticsMotivation = req.body.progressAnalyticsMotivation
  const appusability = req.body.appusability
  const aiAnalyticsThoughts = req.body.aiAnalyticsThoughts

  if (!fitnessImproved || !fitnessScale || !usabilityScore || !progressTracking || !fitnessProgressText ||
    !progressAnalyticsMotivation || !appusability || !aiAnalyticsThoughts
    ) {
      return res.status(400).json({ error: 'Please enter all fields required' });
    }

    const sql =
    "INSERT INTO client_website_interactions (fitnessImproved, fitnessDetails, fitnessScale, usabilityScore, progressTracking, fitnessProgressText, progressAnalyticsMotivation, appusability, aiAnalyticsThoughts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"

    await pool.query(sql, [fitnessImproved, fitnessDetails, fitnessScale, usabilityScore, progressTracking, fitnessProgressText, progressAnalyticsMotivation, appusability, aiAnalyticsThoughts])
    res.json({ message: 'inserted into client_website_interactions' })
})

// insert client review
app.use("/api/insert-client-review", express.urlencoded());

app.post("/api/insert-client-review", async (req, res) => {
  console.log("Received request to insert user:", req.body);

  const description = req.body.description;
  const stars = req.body.stars;
  const name = req.body.name;
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  if (!description || !stars || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO client_testimonials (testimonial_rating, client_name, testimonial_descripton, testimonial_date) VALUES (?, ?, ?, ?)";

  const result = await pool.query(sql, [
    stars,
    name,
    description,
    date,
  ]);

  res.send("Sucessfully added testiminal");
});


//inserting a client note
app.use("/api/insert-client-note", express.urlencoded());

app.post("/api/insert-client-note", async (req, res) => {
  console.log("Received request to insert client note:", req.body);

  const client_id = Number(req.body.client_id);
  const client_note = String(req.body.client_note);

  if (!client_id || !client_note) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Inserting to client_id", client_id);
  console.log("Inserting client_note", client_note);

  const sql =
    "UPDATE client_information SET client_notes = ? WHERE client_id = ?";
  await pool.query(sql, [client_note, client_id]);
  res.json({ message: "Successfully inserted Client Note" });
});

//update client plan type
app.use("/api/update-client-plan/", async (req, res) => {
  console.log('Received request to update client plan:', req.body);

  const client_id = Number(req.body.client_id);
  const plan_change = String(req.body.setPlanChange);

  if (!setPlanChange) {
    return res.status(400).json({error: 'request error'})
  }

  console.log("Inserting plan change: ", plan_change)

  const sql =
  "UPDATE client_information SET plan_change = ? WHERE client_id = ?";
  await pool.query(sql, [plan_change, client_id]);
  res.json({message: 'inserted plan change'})

}) 

//inserting a package change
app.use("/api/insert-package-change", express.urlencoded());

app.post("/api/insert-package-change", async (req, res) => {
  console.log("Received package update:", req.body);

  const packageId = Number(req.body.package_id);
  const packageName = String(req.body.package_name);
  const packagePrice = String(req.body.package_price);
  const packageDescription = String(req.body.package_description);
  const featuresArray = req.body.package_features || [];
  const excludesArray = req.body.package_excludes || [];

  const packageFeatures = Array.isArray(featuresArray)
    ? featuresArray.join(",")
    : featuresArray || "";
  const packageExcludes = Array.isArray(excludesArray)
    ? excludesArray.join(",")
    : excludesArray || "";

  if (!packageId || !packageName || !packagePrice || !packageDescription) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    UPDATE membership_packages
    SET package_name = ?, package_price = ?, package_description = ?,
        package_features = ?, package_excludes = ?
    WHERE package_id = ?
  `;

  await pool.query(sql, [
    packageName,
    packagePrice,
    packageDescription,
    packageFeatures,
    packageExcludes,
    packageId,
  ]);

  res.json({ message: "Successfully inserted package change" });
});


//inserting a plan change
app.use("/api/insert-plan-change", express.urlencoded());

app.post("/api/insert-plan-change", async (req, res) => {
  console.log("Received request to insert plan change:", req.body);

  const plan_id = Number(req.body.plan_id);
  const plan_name = String(req.body.plan_name);
  const plan_description = String(req.body.plan_description);
  const plan_pages = Number(req.body.plan_pages);
  const plan_price = String(req.body.plan_price);
  const plan_stripe_link = String(req.body.plan_stripe_link);

  if (
    !plan_id ||
    !plan_name ||
    !plan_description ||
    !plan_pages ||
    !plan_price ||
    !plan_stripe_link
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    " UPDATE workout_plans SET plan_name = ?, plan_description = ?, plan_pages = ?, plan_price =?, plan_stripe_link =? WHERE plan_id = ?";

  await pool.query(sql, [
    plan_name,
    plan_description,
    plan_pages,
    plan_price,
    plan_stripe_link,
    plan_id,
  ]);
  res.json({ message: "Successfully inserted plan change" });
});

//create a plan change
// Add using secret api key: REF: https://docs.stripe.com/keys?locale=en-GB
// Auto insert a stripe product from form: REF https://docs.stripe.com/api/products/object?lang=node
// Setting up prices in Stripe: REF: https://docs.stripe.com/api/prices/create?lang=node
// setting up automatic payment links Stripe: REF: https://docs.stripe.com/api/payment-link/create?lang=node&lang)=
app.use("/api/create-plan", express.urlencoded());

app.post("/api/create-plan", async (req, res) => {
  console.log("Received request to insert plan:", req.body);

  const plan_name = String(req.body.plan_name);
  const plan_description = String(req.body.plan_description);
  const plan_type = String(req.body.plan_type);
  const plan_pages = Number(req.body.plan_pages);
  const plan_price = String(req.body.plan_price);
  const plan_image = req.body.plan_image;

  if (
    !plan_name ||
    !plan_description ||
    !plan_pages ||
    !plan_price ||
    !plan_type 
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try { 
    const product = await stripe.products.create({
      name: plan_name,
      description: plan_description
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(parseFloat(plan_price) * 100),
      currency: 'gbp',
    });

    // Auto-generate payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    });

    const sql =
      "INSERT INTO workout_plans (plan_name, plan_description, plan_type, plan_pages, plan_price, plan_stripe_link, plan_image) VALUES (?, ?, ?, ?, ?, ?, ?)";

    await pool.query(sql, [
      plan_name,
      plan_description,
      plan_type,
      plan_pages,
      plan_price,
      paymentLink.url,
      plan_image,
    ]);

    res.json({ message: "Successfully created plan", stripe_link: paymentLink.url });

  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({error: error.message});
  }
});


//api insert a client pr
app.use("/api/insert-client-pr-result", express.urlencoded());

app.post("/api/insert-client-pr-result", async (req, res) => {
  console.log("Received request to insert client PR:", req.body);

  const client_id = Number(req.body.client_id);
  const client_pr_name_1 = req.body.client_pr_name_1;
  const client_pr_result_1 = req.body.client_pr_result_1;
  const client_pr_name_2 = req.body.client_pr_name_2;
  const client_pr_result_2 = req.body.client_pr_result_2;
  const client_pr_name_3 = req.body.client_pr_name_3;
  const client_pr_result_3 = req.body.client_pr_result_3;
  const client_pr_name_4 = req.body.client_pr_name_4;
  const client_pr_result_4 = req.body.client_pr_result_4;

  if (!client_id) {
    return res.status(400).json({ error: "Client ID is required" });
  }

  console.log("Updating client_id:", client_id);
  console.log("PR Data:", {
    client_pr_name_1,
    client_pr_result_1,
    client_pr_name_2,
    client_pr_result_2,
    client_pr_name_3,
    client_pr_result_3,
    client_pr_name_4,
    client_pr_result_4,
  });

  const sql =
    "UPDATE client_information SET client_pr_name_1 = ?, client_pr_result_1 = ?, client_pr_name_2 = ?, client_pr_result_2 = ?, client_pr_name_3 = ?, client_pr_result_3 = ?, client_pr_name_4 = ?, client_pr_result_4 = ? WHERE client_id = ?";

  await pool.query(sql, [
    client_pr_name_1,
    client_pr_result_1,
    client_pr_name_2,
    client_pr_result_2,
    client_pr_name_3,
    client_pr_result_3,
    client_pr_name_4,
    client_pr_result_4,
    client_id,
  ]);

  res.json({ message: "Successfully updated client PRs" });
});

//inserting a client change split
// auto scale discussion: REF: https://stackoverflow.com/questions/43983500/how-to-scale-a-nodejs-stateful-application (json)
// json api scaling: REF: https://dev.to/imsushant12/scaling-nodejs-applications-techniques-and-best-practices-3lc0
// fetch and store json REF: https://stackoverflow.com/questions/15367696/storing-json-in-database-vs-having-a-new-column-for-each-key
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
    
    // Store exercises as JSON
    workout.exercises_json = JSON.stringify(exercises);

    console.log("Request body:", req.body);
    console.log("Workout object:", workout);

    if (workout.idupcoming_workouts) {
      // Update existing workout
      await pool.query(
        `UPDATE upcoming_workouts SET
          upcoming_workout_split_name = ?,
          upcoming_workout_date = ?,
          exercises_json = ?
        WHERE idupcoming_workouts = ?`,
        [
          workout.upcoming_workout_split_name,
          workout.upcoming_workout_date,
          workout.exercises_json,
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
          exercises_json
        ) VALUES (?, ?, ?, ?)`,
        [
          clientId,
          workout.upcoming_workout_split_name,
          workout.upcoming_workout_date,
          workout.exercises_json,
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
app.use("/api/insert-client-body-weight", express.json());

app.post("/api/insert-client-body-weight", async (req, res) => {
  console.log("Received request to insert client body weight:", req.body);

  const client_id = Number(req.body.client_id);
  const body_weight = Number(req.body.body_weight);
  const submitted_date =
    req.body.submitted_date || new Date().toISOString().split("T")[0];

  if (!client_id || !body_weight) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Inserting to client_id", client_id);
  console.log("Inserting body_weight", body_weight);

  const sql =
    "INSERT INTO body_weights (client_id, submitted_weight, submitted_date) VALUES (?, ?, ?)";
  await pool.query(sql, [client_id, body_weight, submitted_date]);

  res.json({ message: "Successfully inserted Client Body Weight" });
});

// insert muscle-mass data
app.use("/api/insert-muscle-mass", express.json());
app.post("/api/insert-muscle-mass", async (req, res) => {
  console.log("Received request to insert muscle mass:", req.body);

  const client_id = Number(req.body.client_id);
  const muscle_mass = Number(req.body.muscle_mass);
  const submitted_date =
    req.body.submitted_date || new Date().toISOString().split("T")[0];

  if (!client_id || !muscle_mass) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Inserting to client_id", client_id);
  console.log("Inserting muscle_mass", muscle_mass);

  const sql =
    "INSERT INTO muscle_mass_measurements (client_id, muscle_mass, submitted_date) VALUES (?, ?, ?)";
  await pool.query(sql, [client_id, muscle_mass, submitted_date]);

  res.json({ message: "Successfully inserted Muscle Mass" });
});

// Insert client bmi
app.use("/api/insert-bmi", express.json());
app.post("/api/insert-bmi", async (req, res) => {
  console.log("Received request to insert muscle mass:", req.body);

  const client_id = Number(req.body.client_id);
  const bmi = Number(req.body.bmi);
  const submitted_date =
    req.body.submitted_date || new Date().toISOString().split("T")[0];

  if (!client_id || !bmi) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Inserting to client_id", client_id);
  console.log("Inserting bmi", bmi);

  const sql =
    "INSERT INTO bmi_measurements (client_id, bmi_measurement, submitted_date) VALUES (?, ?, ?)";
  await pool.query(sql, [client_id, bmi, submitted_date]);

  res.json({ message: "Successfully inserted BMI" });
});

// insert a client details from clientdetails.tsx
app.use("/api/insert-client-details", express.urlencoded());
app.post("/api/insert-client-details", async (req, res) => {
  console.log("Received request to insert client details:", req.body);

  const client_id = Number(req.body.client_id);
  const client_firstname = String(req.body.client_firstname);
  const client_lastname = String(req.body.client_lastname);
  const client_goal = String(req.body.client_goal);
  const client_preferred_contact = String(req.body.client_preferred_contact);

  if (!client_id || !client_firstname || !client_lastname) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "UPDATE client_information SET client_firstname = ?, client_lastname = ?, client_goal = ?, client_preferred_contact = ? WHERE client_id = ?";
  await pool.query(sql, [
    client_firstname,
    client_lastname,
    client_goal,
    client_preferred_contact,
    client_id,
  ]);

  res.json({ message: "Successfully inserted Client Details" });
});

// add user from client screen
app.post("/api/create-client", async (req, res) => {
  const {
    client_firstname,
    client_lastname,
    client_preferred_contact,
    client_plan_type,
    client_goals,
    user_username,
    user_password,
  } = req.body;

  if (!client_firstname || !client_lastname || !user_username || !user_password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const hashedPassword = await bcrypt.hash(user_password, 10);

    const [userResult] = await connection.query(
      `INSERT INTO user_logins 
       (user_firstname, user_lastname, user_username, user_password, isAdmin, first_login)
       VALUES (?, ?, ?, ?, 0, 1)`,
      [client_firstname, client_lastname, user_username, hashedPassword]
    );

    const newUserId = userResult.insertId; // this will match client_id

    const [maxResult] = await connection.query(
      "SELECT MAX(client_information_id) AS max_id FROM client_information"
    );
    const nextInfoId = (maxResult[0]?.max_id || 0) + 1;

    await connection.query(
      `INSERT INTO client_information
       (client_information_id, client_id, client_firstname, client_lastname, client_preferred_contact, client_plan_type, client_goal)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nextInfoId, 
        newUserId, 
        client_firstname,
        client_lastname,
        client_preferred_contact,
        client_plan_type,
        client_goals,
      ]
    );

    await connection.commit();

    res.json({
      success: true,
      message: "Client created successfully",
      client_id: newUserId,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Failed to create client" });
  } finally {
    connection.release();
  }
});


// Logging In
app.use("/api/login-user", express.json());

app.post("/api/login-user", async (req, res) => {
  try {
    const { user_username, user_password } = req.body;

    if (!user_username || !user_password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
      SELECT user_id, user_username, user_password, isAdmin, first_login
      FROM user_logins
      WHERE user_username = ?
      LIMIT 1
    `;
    const [rows] = await pool.query(sql, [user_username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];

    const passwordMatch =
      (await bcrypt.compare(user_password, user.user_password)) ||
      user_password === user.user_password;

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.json({
      success: true,
      user_id: user.user_id,
      user_username: user.user_username,
      isAdmin: user.isAdmin,
      requiresSetup: user.first_login === 1,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Complete first-time setup
app.use("/api/complete-setup", express.json());

app.post("/api/complete-setup", async (req, res) => {
  try {
    const { user_id, new_password, first_name, last_name, phone, goal } = req.body;

    if (!user_id || !new_password || !first_name || !last_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    const userLoginSql = `
      UPDATE user_logins
      SET user_password = ?, first_login = 0, user_firstname = ?, user_lastname = ?
      WHERE user_id = ?
    `;
    await pool.query(userLoginSql, [hashedPassword, first_name, last_name, user_id]);

    const clientInfoSql = `
      UPDATE client_information
      SET client_firstname = ?, client_lastname = ?, client_preferred_contact = ?, client_goal = ?
      WHERE client_id = ?
    `;
    await pool.query(clientInfoSql, [first_name, last_name, phone, goal, user_id]);

    return res.json({
      success: true,
      message: "Profile setup completed successfully (password securely hashed)",
    });
  } catch (err) {
    console.error("Setup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// PostHog API Fetch
// Fetching the traffic that interact with the "Start Your Journey" CTA
app.get("/api/posthog-homepage-cta-clicks", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
  };

  const payload = {
    query: {
      kind: "HogQLQuery",
      query:
        "SELECT count() AS click_count FROM events WHERE matchesAction('Clicked \"Start Your Journey\"')",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetching the traffic that interact with the Packages Checkout Button
app.get("/api/posthog-checkout-clicks", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
  };

  const payload = {
    query: {
      kind: "HogQLQuery",
      query:
        "SELECT count() AS click_count FROM events WHERE matchesAction('Initiated Plan Purchase')",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch the Average Rating of the PT
app.get("/api/posthog-average-rating", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
  };

  const payload = {
    query: {
      kind: "HogQLQuery",
      query: `SELECT AVG(toInt(getSurveyResponse(0, '524090f3-c82c-4ded-80e6-f7e010aa9f3f'))) AS average_recommendation
              FROM events
              WHERE event = 'survey sent'
                AND properties.$survey_id = '0198bdae-1adc-0000-ed33-26ade301f5e8'
                AND (
                    NOT JSONHas(properties, '$survey_completed')
                    OR JSONExtractBool(properties, '$survey_completed') = true
                )`,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const averageRating = data.results?.[0]?.[0] || 0;

    const prompt = `A personal trainer has an average client recommendation rating of ${averageRating.toFixed(1)} out of 10. Write a short 2-3 sentence professional insight about this rating make it 80 words.`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    res.json({
      ...data,
      averageRating: averageRating.toFixed(1),
      analysis: aiResponse.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch the Focus Areas of Clients
app.get("/api/posthog-client-focus-areas", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
  };

  const payload = {
    query: {
      kind: "HogQLQuery",
      query:
        "SELECT getSurveyResponse(0, '9c9cd452-d456-492e-b402-a439c17ac461') AS focus_area, COUNT(*) AS response_count FROM events WHERE event = 'survey sent' AND properties.$survey_id = '0198bea4-f36e-0000-a88f-ee590a48e8c3' AND ( NOT JSONHas(properties, '$survey_completed') OR JSONExtractBool(properties, '$survey_completed') = true ) GROUP BY focus_area ORDER BY response_count DESC",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    const prompt = `Analyse client focus area trends and identify potential focal areas in British English. Here is the data: ${JSON.stringify(data.results)}. Provide a short 2-3 sentence insight about the trends and where to focus efforts.`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    res.json({
      ...data,
      analysis: aiResponse.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Total Web Connections for 1 Week Display

app.get("/api/posthog-web-connections", async (req, res) => {
  const url = `https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
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
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const trafficData = data.results || [];
    const totalPageviews = trafficData.reduce((sum, day) => sum + (day.pageviews || 0), 0);

    // AI analysis
    const prompt = `Analyse this 7-day web traffic data and provide a short 2-3 sentence insight:
- Total pageviews: ${totalPageviews}
- Daily breakdown: ${JSON.stringify(trafficData)}
- Predictions

Provide one key observation and one recommendation 

Make it 80 words.`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    res.json({
      results: trafficData,
      totalPageviews,
      analysis: aiResponse.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/{*splat}", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// DELETE
// DELTE FROM DATABASE APIS
app.delete("/api/delete-client/:clientId", async (req, res) => {
  const clientId = Number(req.params.clientId);

  if (!clientId) {
    return res.status(400).json({ error: "Client ID is required" });
  }

  try {
    await pool.query("DELETE FROM client_information WHERE client_id = ?", [clientId]);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Failed to delete client" });
  }
});

// Stripe Delete Product
// Delete stripe product: REF: https://docs.stripe.com/api/products/list?lang=node
app.delete("/api/delete-plan/:planId", async (req, res) => {
  const planId = Number(req.params.planId);

  if (!planId) {
    return res.status(400).json({ error: "Plan ID is required" });
  }

  try {
    await pool.query("DELETE FROM workout_plans WHERE plan_id = ?", [planId]);
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ error: "Failed to delete plan" });
  }
});

//delete trainer todo
app.delete("/api/delete-trainer-todo/:id", async (req, res) => {
  const todo_id = req.params.id;

  if (!todo_id) {
    return res.status(400).json({ error: "Todo ID is required" });
  }

  try {
    await pool.query("DELETE FROM trainer_todo WHERE todo_id = ?", [todo_id]);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});