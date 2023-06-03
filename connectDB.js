// get the client
const { createPool } = require('mysql2/promise');

// create the connection to database
const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'pj2'
});



module.exports = pool;