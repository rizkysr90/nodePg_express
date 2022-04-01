const { Pool } = require('pg');
const configDb = require('./../../config/db/db.config');
const pool = new Pool(configDb);


module.exports = pool;