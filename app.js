// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const booksRoutes = require('./routes/books'); // Import the booksRoutes


const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RDlibrary.db',
  password: 'ilovedata',
  port: 5432, // Your PostgreSQL port (default is 5432)
});

app.use(bodyParser.json());
app.use(cors());

// Mount the booksRoutes to the /api path
app.use('/api', booksRoutes);

// Start listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});