const Pool = require('pg').Pool
import 'dotenv/config';

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  database: process.env.PGDBNAME,
  port: process.env.PGPORT,
})

export default pool