import mysql from 'mysql2/promise';


export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const setUpDb = async () =>{
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await db.connect();
  await db.execute('CREATE DATABASE IF NOT EXISTS tasksDb');
  await db.execute('CREATE TABLE IF NOT EXISTS tasks (ID SERIAL PRIMARY KEY, title VARCHAR(30), ' +
        'description TEXT(500), status ENUM(\'open\',\'in-progress\', \'completed\') '+
        'NOT NULL DEFAULT \'open\')');
};


