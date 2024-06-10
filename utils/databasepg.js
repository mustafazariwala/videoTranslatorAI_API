const Client = require('pg').Client;

require('dotenv').config();

let secret = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
}

if(process.env.POSTGRES_SSL) secret.ssl = process.env.POSTGRES_SSL

const client = new Client(secret);


module.exports = client;