import pg from 'pg';

const { Pool } = pg;

const user = 'postgres';
const password = 'senha';
const host = 'localhost';
const port = 5432;
const database = 'linkr';

const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});

export default connection;