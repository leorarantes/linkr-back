import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
/*
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
*/
const dbConfig = {
    connectionString: process.env.DATABASE_URL
};

if(process.env.MODE === "PROD"){
    dbConfig.ssl = {
        rejectUnauthorized: false
    }
};

const connection = new Pool(dbConfig);

export default connection;