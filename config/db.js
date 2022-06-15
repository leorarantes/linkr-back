import pg from 'pg';
<<<<<<< HEAD
import dotenv from 'dotenv'
dotenv.config()
=======
import dotenv from "dotenv";
>>>>>>> main

dotenv.config();
const { Pool } = pg;
<<<<<<< HEAD
=======
/*
const user = 'postgres';
const password = 'senha';
const host = 'localhost';
const port = 5432;
const database = 'linkr';
>>>>>>> main

const connection = new Pool({
  connectionString: process.env.DATABASE_URL
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