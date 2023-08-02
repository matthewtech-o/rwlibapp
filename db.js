// db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RDlibrary_db',
  password: 'ilovedata',
  port: 5432, // Your PostgreSQL port (default is 5432)
});

module.exports = pool;
