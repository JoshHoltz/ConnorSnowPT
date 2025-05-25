import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

async function test() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const connection = await pool.getConnection();

    // Change this query to select all membership tiers/packages
    const [rows] = await connection.query('SELECT * FROM membership_packages');

    console.log('Membership Packages:', rows);

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Connection test failed:', error);
    process.exit(1);
  }
}

test();
