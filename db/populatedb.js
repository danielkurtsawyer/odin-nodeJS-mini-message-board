require("dotenv").config();

const { Client } = require("pg");

const now = new Date().toLocaleDateString("en-CA");

console.log(now);

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR ( 500 ),
    "user" VARCHAR ( 255 ),
    added DATE
);

INSERT INTO messages (text, "user", added)
VALUES
    ('Hi there!', 'Amando', '${now}'),
    ('Hello World!', 'Charles', '${now}'),
    ('Welcome to my first Express App! This project was built with NodeJS using the Express framework along with EJS as the JavaScript Template Engine. The server was deployed with Railway. If you''re reading this, feel free to leave a message!', 'Dan', '${now}');

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
